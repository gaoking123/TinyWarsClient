
namespace TinyWars.MultiCustomRoom {
    import Lang         = Utility.Lang;
    import FlowManager  = Utility.FlowManager;
    import Notify       = Utility.Notify;

    export class McrMainMenuPanel extends GameUi.UiPanel {
        protected readonly _LAYER_TYPE   = Utility.Types.LayerType.Scene;
        protected readonly _IS_EXCLUSIVE = true;

        private static _instance: McrMainMenuPanel;

        private _labelMenuTitle : GameUi.UiLabel;
        private _btnBack        : GameUi.UiButton;
        private _listCommand    : GameUi.UiScrollList;

        public static show(): void {
            if (!McrMainMenuPanel._instance) {
                McrMainMenuPanel._instance = new McrMainMenuPanel();
            }
            McrMainMenuPanel._instance.open();
        }

        public static hide(): void {
            if (McrMainMenuPanel._instance) {
                McrMainMenuPanel._instance.close();
            }
        }

        private constructor() {
            super();

            this._setAutoAdjustHeightEnabled();
            this.skinName = "resource/skins/multiCustomRoom/McrMainMenuPanel.exml";
        }

        protected _onFirstOpened(): void {
            this._uiListeners = [
                { ui: this._btnBack, callback: this._onTouchedBtnBack },
            ];
            this._notifyListeners = [
                { type: Notify.Type.SLogout,            callback: this._onNotifySLogout },
                { type: Notify.Type.LanguageChanged,    callback: this._onNotifyLanguageChanged },
            ];

            this._listCommand.setItemRenderer(CommandRenderer);
        }

        protected _onOpened(): void {
            this._updateView();
        }

        protected _onClosed(): void {
            this._listCommand.clear();
        }

        ////////////////////////////////////////////////////////////////////////////////
        // Callbacks.
        ////////////////////////////////////////////////////////////////////////////////
        private _onTouchedBtnBack(e: egret.TouchEvent): void {
            FlowManager.gotoLobby();
        }

        private _onNotifySLogout(e: egret.Event): void {
            McrMainMenuPanel.hide();
        }
        private _onNotifyLanguageChanged(e: egret.Event): void {
            this._updateView();
        }

        ////////////////////////////////////////////////////////////////////////////////
        // Private functions.
        ////////////////////////////////////////////////////////////////////////////////
        private _updateView(): void {
            this._labelMenuTitle.text   = Lang.getText(Lang.Type.B0205);
            this._btnBack.label         = Lang.getText(Lang.Type.B0146);
            this._listCommand.bindData(this._createDataForListCommand());
        }

        private _createDataForListCommand(): DataForCommandRenderer[] {
            return [
                {
                    name    : Lang.getText(Lang.Type.B0000),
                    callback: (): void => {
                        McrMainMenuPanel.hide();
                        MultiCustomRoom.McrCreateMapListPanel.show({});
                    },
                },
                {
                    name    : Lang.getText(Lang.Type.B0023),
                    callback: (): void => {
                        McrMainMenuPanel.hide();
                        MultiCustomRoom.McrJoinMapListPanel.show();
                    },
                },
                {
                    name    : Lang.getText(Lang.Type.B0022),
                    callback: (): void => {
                        McrMainMenuPanel.hide();
                        MultiCustomRoom.McrExitMapListPanel.show();
                    },
                },
                {
                    name    : Lang.getText(Lang.Type.B0024),
                    callback: () => {
                        McrMainMenuPanel.hide();
                        MultiCustomRoom.McrContinueWarListPanel.show();
                    },
                    redChecker  : () => {
                        const warInfos  = McrModel.getJoinedOngoingInfos();
                        const userId    = User.UserModel.getSelfUserId();
                        return (!!warInfos) && (warInfos.some(info => {
                            const playerIndex = info.playerIndexInTurn!;
                            return ((playerIndex === 1) && (info.p1UserId === userId))
                                || ((playerIndex === 2) && (info.p2UserId === userId))
                                || ((playerIndex === 3) && (info.p3UserId === userId))
                                || ((playerIndex === 4) && (info.p4UserId === userId));
                        }));
                    },
                },
                {
                    name    : Lang.getText(Lang.Type.B0206),
                    callback: () => {
                        McrMainMenuPanel.hide();
                        McrWatchMainMenuPanel.show();
                    },
                    redChecker  : () => {
                        const watchInfos = McrModel.getWatchRequestedWarInfos();
                        return (!!watchInfos) && (watchInfos.length > 0);
                    },
                },
                {
                    name    : Lang.getText(Lang.Type.B0092),
                    callback: () => {
                        McrMainMenuPanel.hide();
                        MultiCustomRoom.McrReplayListPanel.show();
                    },
                },
            ];
        }
    }

    type DataForCommandRenderer = {
        name        : string;
        callback    : () => void;
        redChecker? : () => boolean;
    }

    class CommandRenderer extends eui.ItemRenderer {
        private _labelCommand   : GameUi.UiLabel;
        private _imgRed         : GameUi.UiImage;

        protected dataChanged(): void {
            super.dataChanged();

            const data              = this.data as DataForCommandRenderer;
            this._labelCommand.text = data.name;
            this._imgRed.visible    = (!!data.redChecker) && (data.redChecker());
        }

        public onItemTapEvent(e: eui.ItemTapEvent): void {
            (this.data as DataForCommandRenderer).callback();
        }
    }
}
