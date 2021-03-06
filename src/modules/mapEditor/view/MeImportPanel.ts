
namespace TinyWars.MapEditor {
    import Notify   = Utility.Notify;
    import Lang     = Utility.Lang;
    import Types    = Utility.Types;

    export class MeImportPanel extends GameUi.UiPanel {
        protected readonly _LAYER_TYPE   = Utility.Types.LayerType.Hud1;
        protected readonly _IS_EXCLUSIVE = false;

        private static _instance: MeImportPanel;

        private _group      : eui.Group;
        private _listMap    : TinyWars.GameUi.UiScrollList;
        private _btnCancel  : TinyWars.GameUi.UiButton;

        public static show(): void {
            if (!MeImportPanel._instance) {
                MeImportPanel._instance = new MeImportPanel();
            }
            MeImportPanel._instance.open();
        }
        public static hide(): void {
            if (MeImportPanel._instance) {
                MeImportPanel._instance.close();
            }
        }

        public constructor() {
            super();

            this._setAutoAdjustHeightEnabled();
            this._setTouchMaskEnabled();
            this._callbackForTouchMask = () => this.close();
            this.skinName = "resource/skins/mapEditor/MeImportPanel.exml";
        }

        protected _onFirstOpened(): void {
            this._notifyListeners = [
                { type: Notify.Type.LanguageChanged,    callback: this._onNotifyLanguageChanged },
            ];
            this._uiListeners = [
                { ui: this._btnCancel,  callback: this.close },
            ];
            this._listMap.setItemRenderer(MapRenderer);
            this._listMap.scrollPolicyH = eui.ScrollPolicy.OFF;
        }

        protected _onOpened(): void {
            this._updateComponentsForLanguage();

            this._updateListMap();
        }

        protected _onClosed(): void {
            this._listMap.clear();
        }

        ////////////////////////////////////////////////////////////////////////////////
        // Callbacks.
        ////////////////////////////////////////////////////////////////////////////////
        private _onNotifyLanguageChanged(e: egret.Event): void {
            this._updateComponentsForLanguage();
        }

        ////////////////////////////////////////////////////////////////////////////////
        // Private functions.
        ////////////////////////////////////////////////////////////////////////////////
        private _updateComponentsForLanguage(): void {
            this._btnCancel.label   = Lang.getText(Lang.Type.B0154);
        }

        private async _createDataForListMap(): Promise<DataForTileBaseRenderer[]> {
            const dataList: DataForTileBaseRenderer[] = [];
            for (const [mapFileName] of WarMap.WarMapModel.getExtraDataDict()) {
                dataList.push({
                    mapFileName,
                    mapName     : await WarMap.WarMapModel.getMapNameInLanguage(mapFileName),
                    panel       : this,
                });
            }
            return dataList.sort((a, b) => a.mapName.localeCompare(b.mapName, "zh"));
        }

        private async _updateListMap(): Promise<void> {
            this._listMap.bindData(await this._createDataForListMap());
            this._listMap.scrollVerticalTo(0);
        }
    }

    type DataForTileBaseRenderer = {
        mapFileName : string;
        mapName     : string;
        panel       : MeImportPanel;
    }

    class MapRenderer extends eui.ItemRenderer {
        private _group          : eui.Group;
        private _labelName      : GameUi.UiLabel;

        protected dataChanged(): void {
            const data              = this.data as DataForTileBaseRenderer;
            this._labelName.text    = data.mapName;
        }

        public onItemTapEvent(): void {
            const data          = this.data as DataForTileBaseRenderer;
            const mapFileName   = data.mapFileName;
            Common.ConfirmPanel.show({
                title   : Lang.getText(Lang.Type.B0088),
                content : Lang.getText(Lang.Type.A0095) + `\n"${data.mapName}"`,
                callback: async () => {
                    const war = MeManager.getWar();
                    war.stopRunning()
                        .init(await WarMap.WarMapModel.getMapRawData(mapFileName) as Types.MapRawData, war.getSlotIndex(), war.getConfigVersion(), war.getIsReview())
                        .startRunning()
                        .startRunningView();

                    data.panel.close();
                },
            });
        }
    }
}
