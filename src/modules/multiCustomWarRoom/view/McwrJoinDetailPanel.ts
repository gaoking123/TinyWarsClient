
namespace TinyWars.MultiCustomWarRoom {
    import ProtoTypes       = Utility.ProtoTypes;
    import Helpers          = Utility.Helpers;
    import Notify           = Utility.Notify;
    import Lang             = Utility.Lang;
    import FloatText        = Utility.FloatText;
    import Types            = Utility.Types;
    import HelpPanel        = Common.HelpPanel;
    import TemplateMapModel = WarMap.WarMapModel;

    export class McwrJoinDetailPanel extends GameUi.UiPanel {
        protected readonly _LAYER_TYPE   = Utility.Types.LayerType.Hud0;
        protected readonly _IS_EXCLUSIVE = true;

        private static _instance: McwrJoinDetailPanel;

        private _btnHelpFog                 : GameUi.UiButton;
        private _btnHelpTimeLimit           : GameUi.UiButton;
        private _labelWarPassword           : GameUi.UiLabel;
        private _labelHasFog                : GameUi.UiLabel;
        private _labelTimeLimit             : GameUi.UiLabel;
        private _labelInitialFund           : GameUi.UiLabel;
        private _labelIncomeModifier        : GameUi.UiLabel;
        private _labelInitialEnergy         : GameUi.UiLabel;
        private _labelEnergyGrowthModifier  : GameUi.UiLabel;
        private _labelMoveRangeModifier     : GameUi.UiLabel;
        private _labelAttackPowerModifier   : GameUi.UiLabel;
        private _labelVisionRangeModifier   : GameUi.UiLabel;
        private _listPlayer                 : GameUi.UiScrollList;

        private _btnPrevPlayerIndex : GameUi.UiButton;
        private _btnNextPlayerIndex : GameUi.UiButton;
        private _labelPlayerIndex   : GameUi.UiLabel;

        private _btnPrevTeamIndex    : GameUi.UiButton;
        private _btnNextTeamIndex    : GameUi.UiButton;
        private _labelTeamIndex      : GameUi.UiLabel;

        private _btnConfirm: GameUi.UiButton;
        private _btnCancel : GameUi.UiButton;

        private _openData               : ProtoTypes.IWaitingMultiCustomWarInfo;
        private _availablePlayerIndexes : number[];
        private _playerIndexIndex       : number;
        private _availableTeamIndexes   : number[];
        private _teamIndexIndex         : number;

        public static show(data: ProtoTypes.IWaitingMultiCustomWarInfo): void {
            if (!McwrJoinDetailPanel._instance) {
                McwrJoinDetailPanel._instance = new McwrJoinDetailPanel();
            }
            McwrJoinDetailPanel._instance._openData = data;
            McwrJoinDetailPanel._instance.open();
        }
        public static hide(): void {
            if (McwrJoinDetailPanel._instance) {
                McwrJoinDetailPanel._instance.close();
            }
        }

        private constructor() {
            super();

            this._setAutoAdjustHeightEnabled();
            this._setTouchMaskEnabled();
            this._callbackForTouchMask = () => McwrJoinDetailPanel.hide();
            this.skinName = "resource/skins/multiCustomWarRoom/McwrJoinDetailPanel.exml";
        }

        protected _onFirstOpened(): void {
            this._uiListeners = [
                { ui: this._btnHelpFog,         callback: this._onTouchedBtnHelpFog },
                { ui: this._btnHelpTimeLimit,   callback: this._onTouchedBtnHelpTimeLimit },
                { ui: this._btnCancel,          callback: this._onTouchedBtnCancel },
                { ui: this._btnConfirm,         callback: this._onTouchedBtnConfirm },
                { ui: this._btnPrevPlayerIndex, callback: this._onTouchedBtnPrevPlayerIndex, },
                { ui: this._btnNextPlayerIndex, callback: this._onTouchedBtnNextPlayerIndex, },
                { ui: this._btnPrevTeamIndex,   callback: this._onTouchedBtnPrevTeam, },
                { ui: this._btnNextTeamIndex,   callback: this._onTouchedBtnNextTeam, },
            ];
            this._notifyListeners = [
                { type: Notify.Type.SJoinCustomOnlineWar, callback: this._onNotifySJoinCustomOnlineWar },
            ];

            this._listPlayer.setItemRenderer(PlayerRenderer);
        }

        protected _onOpened(): void {
            this._availablePlayerIndexes = this._getAvailablePlayerIndexes();
            this._availableTeamIndexes   = this._getAvailableTeamIndexes();
            this._playerIndexIndex       = 0;
            this._teamIndexIndex         = 0;
            this._updateView();
        }

        protected _onClosed(): void {
            this._listPlayer.clear();
        }

        ////////////////////////////////////////////////////////////////////////////////
        // Callbacks.
        ////////////////////////////////////////////////////////////////////////////////
        private _onTouchedBtnHelpFog(e: egret.TouchEvent): void {
            HelpPanel.show({
                title  : Lang.getText(Lang.BigType.B01, Lang.SubType.S20),
                content: Lang.getRichText(Lang.RichType.R002),
            });
        }

        private _onTouchedBtnHelpTimeLimit(e: egret.TouchEvent): void {
            HelpPanel.show({
                title  : Lang.getText(Lang.BigType.B01, Lang.SubType.S21),
                content: Lang.getRichText(Lang.RichType.R003),
            });
        }

        private _onTouchedBtnCancel(e: egret.TouchEvent): void {
            McwrJoinDetailPanel.hide();
        }

        private _onTouchedBtnConfirm(e: egret.TouchEvent): void {
            McwrProxy.reqJoin(
                this._openData.id,
                this._availablePlayerIndexes[this._playerIndexIndex],
                this._availableTeamIndexes[this._teamIndexIndex]
            );
        }

        private _onTouchedBtnPrevPlayerIndex(e: egret.TouchEvent): void {
            const index            = this._playerIndexIndex - 1;
            this._playerIndexIndex = index < 0 ? this._availablePlayerIndexes.length - 1 : index;
            this._updateLabelPlayerIndex();
        }

        private _onTouchedBtnNextPlayerIndex(e: egret.TouchEvent): void {
            const index            = this._playerIndexIndex + 1;
            this._playerIndexIndex = index >= this._availablePlayerIndexes.length ? 0 : index;
            this._updateLabelPlayerIndex();
        }

        private _onTouchedBtnPrevTeam(e: egret.TouchEvent): void {
            const index          = this._teamIndexIndex - 1;
            this._teamIndexIndex = index < 0 ? this._availableTeamIndexes.length - 1 : index;
            this._updateLabelTeamIndex();
        }

        private _onTouchedBtnNextTeam(e: egret.TouchEvent): void {
            const index          = this._teamIndexIndex + 1;
            this._teamIndexIndex = index >= this._availableTeamIndexes.length ? 0 : index;
            this._updateLabelTeamIndex();
        }

        private _onNotifySJoinCustomOnlineWar(e: egret.Event): void {
            const data = e.data as ProtoTypes.IS_JoinMultiCustomWar;
            FloatText.show(Lang.getText(Lang.BigType.B00, data.isStarted ? Lang.SubType.S19 : Lang.SubType.S18));
            McwrJoinDetailPanel.hide();
        }

        ////////////////////////////////////////////////////////////////////////////////
        // View functions.
        ////////////////////////////////////////////////////////////////////////////////
        private _updateView(): void {
            const info = this._openData;
            this._labelWarPassword.text             = info.warPassword  ? info.warPassword : "----";
            this._labelHasFog.text                  = Lang.getText(Lang.BigType.B01, info.hasFog ? Lang.SubType.S12 : Lang.SubType.S13);
            this._labelTimeLimit.text               = Helpers.getTimeText(info.timeLimit);
            this._labelInitialFund.text             = `${info.initialFund}`;
            this._labelIncomeModifier.text          = `${info.incomeModifier}%`;
            this._labelInitialEnergy.text           = `${info.initialEnergy}%`;
            this._labelEnergyGrowthModifier.text    = `${info.energyGrowthModifier}%`;
            this._labelMoveRangeModifier.text       = `${info.moveRangeModifier > 0 ? "+" : ""}${info.moveRangeModifier}`;
            this._labelAttackPowerModifier.text     = `${info.attackPowerModifier > 0 ? "+" : ""}${info.attackPowerModifier}%`;
            this._labelVisionRangeModifier.text     = `${info.visionRangeModifier > 0 ? "+" : ""}${info.visionRangeModifier}`;
            this._listPlayer.bindData(this._getDataForListPlayer());
            this._updateLabelPlayerIndex();
            this._updateLabelTeamIndex();
        }

        private _updateLabelPlayerIndex(): void {
            const index = this._availablePlayerIndexes[this._playerIndexIndex];
            this._labelPlayerIndex.text = `${index} (${Helpers.getColorText(index)})`;
        }

        private _updateLabelTeamIndex(): void {
            const index = this._availableTeamIndexes[this._teamIndexIndex];
            this._labelTeamIndex.text = Helpers.getTeamText(index);
        }

        private _getDataForListPlayer(): DataForPlayerRenderer[] {
            const warInfo = this._openData;
            const data: DataForPlayerRenderer[] = [
                {
                    playerIndex: 1,
                    playerName : warInfo.p1UserNickname,
                    teamIndex  : warInfo.p1TeamIndex,
                },
                {
                    playerIndex: 2,
                    playerName : warInfo.p2UserNickname,
                    teamIndex  : warInfo.p2TeamIndex,
                },
            ];

            const mapInfo = TemplateMapModel.getMapInfo(warInfo as Types.MapIndexKey);
            if (mapInfo.playersCount >= 3) {
                data.push({
                    playerIndex: 3,
                    playerName : warInfo.p3UserNickname,
                    teamIndex  : warInfo.p3TeamIndex,
                });
            }
            if (mapInfo.playersCount >= 4) {
                data.push({
                    playerIndex: 4,
                    playerName : warInfo.p4UserNickname,
                    teamIndex  : warInfo.p4TeamIndex,
                });
            }

            return data;
        }

        private _getAvailablePlayerIndexes(): number[] {
            const info         = this._openData;
            const playersCount = TemplateMapModel.getMapInfo(info as Types.MapIndexKey).playersCount;
            const indexDict: {[index: number]: boolean} = {};
            if ((playersCount >= 4) && (info.p4UserId == null)) {
                indexDict[4] = true;
            }
            if ((playersCount >= 3) && (info.p3UserId == null)) {
                indexDict[3] = true;
            }
            if ((playersCount >= 2) && (info.p2UserId == null)) {
                indexDict[2] = true;
            }
            if ((playersCount >= 1) && (info.p1UserId == null)) {
                indexDict[1] = true;
            }

            const indexes: number[] = [];
            for (let i = 1; i <= playersCount; ++i) {
                if (indexDict[i]) {
                    indexes.push(i);
                }
            }
            return indexes;
        }

        private _getAvailableTeamIndexes(): number[] {
            const info = this._openData;
            const dict: {[index: number]: number} = {};
            (info.p1TeamIndex != null) && (dict[info.p1TeamIndex] = (dict[info.p1TeamIndex] || 0) + 1);
            (info.p2TeamIndex != null) && (dict[info.p2TeamIndex] = (dict[info.p2TeamIndex] || 0) + 1);
            (info.p3TeamIndex != null) && (dict[info.p3TeamIndex] = (dict[info.p3TeamIndex] || 0) + 1);
            (info.p4TeamIndex != null) && (dict[info.p4TeamIndex] = (dict[info.p4TeamIndex] || 0) + 1);

            let teamsCount  = 0;
            let currPlayers = 0;
            for (let i = 1; i <= 4; ++i) {
                if (dict[i]) {
                    ++teamsCount;
                    currPlayers += dict[i];
                }
            }

            const totalPlayers = TemplateMapModel.getMapInfo(info as Types.MapIndexKey).playersCount;
            if ((teamsCount > 1) || (currPlayers < totalPlayers - 1)) {
                const indexes: number[] = [];
                for (let i = 1; i <= totalPlayers; ++i) {
                    indexes.push(i);
                }
                while (dict[indexes[0]]) {
                    indexes.push(indexes.shift());
                }
                return indexes;
            } else {
                const indexes: number[] = [];
                for (let i = 1; i <= totalPlayers; ++i) {
                    if (!dict[i]) {
                        indexes.push(i);
                    }
                }
                return indexes;
            }
        }
    }

    type DataForPlayerRenderer = {
        playerIndex: number;
        playerName : string;
        teamIndex  : number;
    }

    class PlayerRenderer extends eui.ItemRenderer {
        private _labelName : GameUi.UiLabel;
        private _labelIndex: GameUi.UiLabel;
        private _labelTeam : GameUi.UiLabel;

        protected dataChanged(): void {
            super.dataChanged();

            const data = this.data as DataForPlayerRenderer;
            this._labelIndex.text = Helpers.getColorText(data.playerIndex);
            this._labelName.text  = data.playerName || "????";
            this._labelTeam.text  = data.teamIndex != null ? Helpers.getTeamText(data.teamIndex) : "??";
        }
    }
}