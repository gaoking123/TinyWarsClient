
namespace TinyWars.MultiCustomRoom {
    import ProtoTypes   = Utility.ProtoTypes;
    import Notify       = Utility.Notify;
    import Lang         = Utility.Lang;
    import Helpers      = Utility.Helpers;
    import Types        = Utility.Types;

    export class McrWatchDeleteWatcherDetailPanel extends GameUi.UiPanel {
        protected readonly _LAYER_TYPE   = Utility.Types.LayerType.Scene;
        protected readonly _IS_EXCLUSIVE = false;

        private static _instance: McrWatchDeleteWatcherDetailPanel;

        private _labelMenuTitle         : GameUi.UiLabel;
        private _labelDelete            : GameUi.UiLabel;
        private _labelKeep              : GameUi.UiLabel;
        private _labelIsOpponent        : GameUi.UiLabel;
        private _labelIsWatchingOthers  : GameUi.UiLabel;
        private _listPlayer             : GameUi.UiScrollList;
        private _btnConfirm             : GameUi.UiButton;
        private _btnCancel              : GameUi.UiButton;

        private _openData           : ProtoTypes.IMcwWatchInfo;
        private _dataForListPlayer  : DataForRequesterRenderer[];

        public static show(warInfo: ProtoTypes.IMcwWatchInfo): void {
            if (!McrWatchDeleteWatcherDetailPanel._instance) {
                McrWatchDeleteWatcherDetailPanel._instance = new McrWatchDeleteWatcherDetailPanel();
            }
            McrWatchDeleteWatcherDetailPanel._instance._openData = warInfo;
            McrWatchDeleteWatcherDetailPanel._instance.open();
        }
        public static hide(): void {
            if (McrWatchDeleteWatcherDetailPanel._instance) {
                McrWatchDeleteWatcherDetailPanel._instance.close();
            }
        }

        public constructor() {
            super();

            this._setAutoAdjustHeightEnabled();
            this._setTouchMaskEnabled();
            this._callbackForTouchMask = () => this.close();
            this.skinName = "resource/skins/multiCustomRoom/McrWatchDeleteWatcherDetailPanel.exml";
        }

        protected _onFirstOpened(): void {
            this._notifyListeners = [
                { type: Notify.Type.LanguageChanged,    callback: this._onNotifyLanguageChanged },
            ];
            this._uiListeners = [
                { ui: this._btnCancel,  callback: this.close },
                { ui: this._btnConfirm, callback: this._onTouchedBtnConfirm },
            ];
            this._listPlayer.setItemRenderer(RequesterRenderer);
        }

        protected _onOpened(): void {
            this._dataForListPlayer = this._generateDataForListPlayer();
            this._updateView();
        }

        protected _onClosed(): void {
            this._listPlayer.clear();
            this._dataForListPlayer = null;
        }

        public setRequesterSelected(index: number, selected: boolean): void {
            const dataList  = this._dataForListPlayer;
            const data      = dataList[index];
            data.isDelete   = selected;
            this._listPlayer.updateSingleData(index, data);
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Callbacks.
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        private _onNotifyLanguageChanged(e: egret.Event): void {
            this._updateComponentsForLanguage();
        }

        private _onTouchedBtnConfirm(e: egret.TouchEvent): void {
            const deleteUserIds : number[] = [];
            for (const data of this._dataForListPlayer) {
                if (data.isDelete) {
                    deleteUserIds.push(data.userId);
                }
            }
            if (deleteUserIds.length) {
                McrProxy.reqWatchDeleteWatcher(this._openData.mcwDetail.id, deleteUserIds);
            }
            this.close();
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Other functions.
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        private _updateView(): void {
            this._updateComponentsForLanguage();
            this._listPlayer.bindData(this._dataForListPlayer);
        }

        private _updateComponentsForLanguage(): void {
            this._labelMenuTitle.text           = Lang.getText(Lang.Type.B0219);
            this._labelDelete.text              = Lang.getText(Lang.Type.B0220);
            this._labelKeep.text                = Lang.getText(Lang.Type.B0221);
            this._labelIsOpponent.text          = Lang.getText(Lang.Type.B0217);
            this._labelIsWatchingOthers.text    = Lang.getText(Lang.Type.B0218);
            this._btnConfirm.label              = Lang.getText(Lang.Type.B0026);
            this._btnCancel.label               = Lang.getText(Lang.Type.B0154);
        }

        private _generateDataForListPlayer(): DataForRequesterRenderer[] {
            const openData  = this._openData;
            const warInfo   = openData.mcwDetail;
            const dataList  : DataForRequesterRenderer[] = [];
            for (const info of this._openData.requesterInfos) {
                const userId = info.userId;
                dataList.push({
                    panel           : this,
                    nickname        : info.nickname,
                    userId,
                    isWatchingOthers: !!info.isRequestingOthers || !!info.isWatchingOthers,
                    isOpponent      : (warInfo.p1UserId === userId) || (warInfo.p2UserId === userId) || (warInfo.p3UserId === userId) || (warInfo.p4UserId === userId),
                    isDelete        : false,
                });
            }

            return dataList;
        }
    }

    type DataForRequesterRenderer = {
        panel           : McrWatchDeleteWatcherDetailPanel;
        nickname        : string;
        userId          : number;
        isWatchingOthers: boolean;
        isOpponent      : boolean;
        isDelete        : boolean;
    }

    class RequesterRenderer extends eui.ItemRenderer {
        private _labelName              : GameUi.UiLabel;
        private _labelIsOpponent        : GameUi.UiLabel;
        private _labelIsWatchingOthers  : GameUi.UiLabel;
        private _imgDelete              : GameUi.UiImage;
        private _imgKeep                : GameUi.UiImage;

        protected dataChanged(): void {
            super.dataChanged();

            const data                          = this.data as DataForRequesterRenderer;
            this._labelName.text                = data.nickname;
            this._labelIsOpponent.text          = data.isOpponent ? Lang.getText(Lang.Type.B0012) : "";
            this._labelIsWatchingOthers.text    = data.isWatchingOthers ? Lang.getText(Lang.Type.B0012) : "";
            this._imgDelete.visible             = data.isDelete;
            this._imgKeep.visible               = !data.isDelete;
        }

        public onItemTapEvent(e: eui.ItemTapEvent): void {
            if ((this._imgDelete.visible) || (this._imgKeep.visible)) {
                const data = this.data as DataForRequesterRenderer;
                data.panel.setRequesterSelected(e.itemIndex, !data.isDelete);
            }
        }
    }
}
