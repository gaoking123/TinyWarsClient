
namespace TinyWars.Replay {
    import FloatText     = Utility.FloatText;
    import Notify       = Utility.Notify;
    import Lang         = Utility.Lang;

    const _CELL_WIDTH            = 80;
    const _LEFT_X               = 80;
    const _RIGHT_X              = 880;

    export class ReplaConsolePanel extends GameUi.UiPanel {
        protected readonly _LAYER_TYPE = Utility.Types.LayerType.Hud0;
        protected readonly _IS_EXCLUSIVE = false;

        private static _instance: ReplaConsolePanel;

        private _group                      : eui.Group;
        private _labelPlayRateTitle         : GameUi.UiLabel;
        private _btnDecreasePlayRate        : GameUi.UiButton;
        private _btnIncreasePlayRate        : GameUi.UiButton;
        private _labelPlayRate              : GameUi.UiLabel;
        private _btnHideConsole             : GameUi.UiButton;
        private _groupTurnEditon            : eui.Group;
        private _labelCurrentTurnTitle      : GameUi.UiLabel;
        private _btnFirstTurn               : GameUi.UiButton;
        private _btnPrevTurn                : GameUi.UiButton;
        private _btnNextTurn                : GameUi.UiButton;
        private _inputCurrentTurn           : GameUi.UiTextInput;
        private _btnLastTurn                : GameUi.UiButton;
        private _btnJumpCurrentTurn         : GameUi.UiButton;
        private _groupActionEditon          : eui.Group;
        private _labelCurrentActionTitle    : GameUi.UiLabel;
        private _btnFirstAction             : GameUi.UiButton;
        private _btnPrevAction              : GameUi.UiButton;
        private _inputCurrentAction         : GameUi.UiTextInput;
        private _btnNextAction              : GameUi.UiButton;
        private _btnLastAction              : GameUi.UiButton;
        private _btnJumpCurrentAction       : GameUi.UiButton;
        private _labelName                  : GameUi.UiLabel;
        private _groupControlEdtion         : eui.Group;
        private _btnStartReplay             : GameUi.UiButton;
        private _btnPauseReplay             : GameUi.UiButton;
        private _bthHideNotify              : GameUi.UiButton;
        private _btnShowNotify              : GameUi.UiButton;

        private _war    : ReplayWar;


        public static show(): void {
            if (!ReplaConsolePanel._instance) {
                ReplaConsolePanel._instance = new ReplaConsolePanel();
            }
            ReplaConsolePanel._instance.open();
        }

        public static hide(): void {
            if (ReplaConsolePanel._instance) {
                ReplaConsolePanel._instance.close();
            }
        }

        public static getInstance(): ReplaConsolePanel {
            return ReplaConsolePanel._instance;
        }

        public constructor() {
            super();

            this._setAutoAdjustHeightEnabled();
            this.skinName = `resource/skins/replay/ReplayConsolePanel.exml`;
        }

        protected _onFirstOpened(): void {
            this._notifyListeners = [
                { type: Notify.Type.ReplayAutoReplayChanged,    callback: this._onNotifyReplayAutoReplayChanged },
                { type: Notify.Type.BwTurnIndexChanged,         callback: this._onNotifyBwTurnIndexChanged },
            ];
            this._uiListeners = [
                { ui: this._btnHideConsole,      callback: this._onTouchedBtnHideConsole },
                { ui: this._btnHideConsole,      callback: this._onTouchedBtnHideConsole },
                { ui: this._btnJumpCurrentTurn,  callback: this._onTouchedJumpCurrentTurn },
            ];
            this._updateComponentsForLanguage();
        }

        protected _onOpened(): void {
            this._war = ReplayModel.getWar();
            this._updatebtnvvisible();
            this._updateDisplay();
        }

        protected _onClosed(): void {

        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Callbacks.
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        private _onNotifyReplayAutoReplayChanged(e: egret.Event): void {
            this._updateAutoReplayButton();
        }

        private _onNotifyBwTurnIndexChanged(e: egret.Event): void {
            this._inputCurrentTurn.textDisplay.text = `${this._war.getTurnManager().getTurnIndex()}`
        }

        private _onTouchedBtnHideConsole(e: egret.Event): void {
            this.close();
        }

        private _onTouchedBtnHideNotify(e: egret.Event): void {
            FloatText.show("TODO");
        }

        private _onTouchedJumpCurrentTurn(e: egret.Event): void {
            FloatText.show("TODO");
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Functions for view.
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        private _updateView(): void {
            // this._updateComponentsForLanguage();
        }

        private _updateComponentsForLanguage(): void {
            this._labelName.text                = Lang.getText(Lang.Type.B0255);
            this._btnHideConsole.label          = Lang.getText(Lang.Type.B0261);
            this._labelPlayRateTitle.text       = `${Lang.getText(Lang.Type.B0256)}:`;
            this._labelCurrentTurnTitle.text    = `${Lang.getText(Lang.Type.B0091)}:`;
            this._labelCurrentActionTitle.text  = `${Lang.getText(Lang.Type.B0254)}:`;
            this._btnJumpCurrentTurn.label      = Lang.getText(Lang.Type.B0257);
            this._btnJumpCurrentAction.label    = Lang.getText(Lang.Type.B0258);
            this._btnStartReplay.label          = Lang.getText(Lang.Type.B0249);
            this._btnPauseReplay.label          = Lang.getText(Lang.Type.B0250);
            this._bthHideNotify.label           = Lang.getText(Lang.Type.B0259);
            this._btnShowNotify.label           = Lang.getText(Lang.Type.B0260);
        }

        private _updatebtnvvisible(): void{
            this._updateAutoReplayButton();
            //TODO: hide/show Notify
            this._bthHideNotify.visible  = true;
            this._btnShowNotify.visible  = false;
        }

        private _updateAutoReplayButton(): void{
            this._btnStartReplay.visible = !this._war.getIsAutoReplay();
            this._btnPauseReplay.visible = this._war.getIsAutoReplay();
        }

        private _updateDisplay(): void{
            this._inputCurrentTurn.textDisplay.text = `${this._war.getTurnManager().getTurnIndex()}`
        }
    }
}
