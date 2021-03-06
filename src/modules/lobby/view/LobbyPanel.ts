
namespace TinyWars.Lobby {
    import Lang         = Utility.Lang;
    import FloatText    = Utility.FloatText;
    import Notify       = Utility.Notify;
    import UserModel    = User.UserModel;

    export class LobbyPanel extends GameUi.UiPanel {
        protected readonly _LAYER_TYPE   = Utility.Types.LayerType.Scene;
        protected readonly _IS_EXCLUSIVE = true;

        private static _instance: LobbyPanel;

        private _group1: eui.Group;
        private _group2: eui.Group;
        private _group3: eui.Group;
        private _group4: eui.Group;

        private _labelMenuTitle : GameUi.UiLabel;
        private _listCommand    : GameUi.UiScrollList;

        public static show(): void {
            if (!LobbyPanel._instance) {
                LobbyPanel._instance = new LobbyPanel();
            }
            LobbyPanel._instance.open();
        }

        public static hide(): void {
            if (LobbyPanel._instance) {
                LobbyPanel._instance.close();
            }
        }

        private constructor() {
            super();

            this._setAutoAdjustHeightEnabled();
            this.skinName = "resource/skins/lobby/LobbyPanel.exml";
        }

        protected _onFirstOpened(): void {
            this._uiListeners = [
                { ui: this, callback: this._onResize, eventType: egret.Event.RESIZE },
            ];
            this._notifyListeners = [
                { type: Notify.Type.SLogout,            callback: this._onNotifySLogout },
                { type: Notify.Type.LanguageChanged,    callback: this._onNotifyLanguageChanged },
            ];

            this._listCommand.setItemRenderer(CommandRenderer);
        }

        protected _onOpened(): void {
            this._updateComponentsForLanguage();
            this._listCommand.bindData(this._createDataForListCommand());
        }

        protected _onClosed(): void {
            this._listCommand.clear();
        }

        ////////////////////////////////////////////////////////////////////////////////
        // Callbacks.
        ////////////////////////////////////////////////////////////////////////////////
        private _onResize(e: egret.Event): void {
            this._group1.height = (this.height - 40 - 90) / 2;
            this._group2.height = (this.height - 40 - 90) / 2;
            this._group3.height = (this.height - 40 - 90) / 2;
            this._group4.height = (this.height - 40 - 90) / 2;
        }

        private _onNotifySLogout(e: egret.Event): void {
            LobbyPanel.hide();
        }

        private _onNotifyLanguageChanged(e: egret.Event): void {
            this._updateComponentsForLanguage();
        }

        ////////////////////////////////////////////////////////////////////////////////
        // Private functions.
        ////////////////////////////////////////////////////////////////////////////////
        private _updateComponentsForLanguage(): void {
            this._labelMenuTitle.text = Lang.getText(Lang.Type.B0155);
        }

        private _createDataForListCommand(): DataForCommandRenderer[] {
            const dataList: DataForCommandRenderer[] = [
                {
                    name    : Lang.getText(Lang.Type.B0137),
                    callback: (): void => {
                        this.close();
                        MultiCustomRoom.McrMainMenuPanel.show();
                    },
                },
                {
                    name    : Lang.getText(Lang.Type.B0138),
                    callback: (): void => {
                        this.close();
                        SinglePlayerLobby.SinglePlayerLobbyPanel.show();
                    },
                },
                {
                    name    : Lang.getText(Lang.Type.B0271),
                    callback: (): void => {
                        this.close();
                        MapEditor.MeMapListPanel.show();
                    },
                }
            ];

            if ((UserModel.checkIsAdmin()) || (UserModel.checkIsMapCommittee())) {
                dataList.push({
                    name    : Lang.getText(Lang.Type.B0192),
                    callback: (): void => {
                        LobbyPanel.hide();
                        MapManagement.MmMainMenuPanel.show();
                    },
                });
            }

            return dataList;
        }
    }

    type DataForCommandRenderer = {
        name    : string;
        callback: () => void;
    }

    class CommandRenderer extends eui.ItemRenderer {
        private _labelCommand: GameUi.UiLabel;

        protected dataChanged(): void {
            super.dataChanged();

            const data = this.data as DataForCommandRenderer;
            this._labelCommand.text = data.name;
        }

        public onItemTapEvent(e: eui.ItemTapEvent): void {
            (this.data as DataForCommandRenderer).callback();
        }
    }
}
