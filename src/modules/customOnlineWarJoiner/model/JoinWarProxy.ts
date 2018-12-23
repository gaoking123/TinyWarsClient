
namespace TinyWars.CustomOnlineWarJoiner {
    import NetManager = Network.Manager;
    import ActionCode = Network.Codes;
    import Helpers    = Utility.Helpers;
    import ProtoTypes = Utility.ProtoTypes;
    import Notify     = Utility.Notify;

    export namespace JoinWarProxy {
        export function init(): void {
            NetManager.addListeners(
                { actionCode: ActionCode.S_GetUnjoinedWaitingCustomOnlineWarInfos, callback: _onSGetUnjoinedWaitingCustomOnlineWarInfos, thisObject: JoinWarProxy },
                { actionCode: ActionCode.S_JoinCustomOnlineWar,                    callback: _onSJoinCustomOnlineWar,                    thisObject: JoinWarProxy },
            );
        }

        export function reqUnjoinedWaitingCustomOnlineWarInfos(): void {
            NetManager.send({
                actionCode: ActionCode.C_GetUnjoinedWaitingCustomOnlineWarInfos,
            });
        }
        function _onSGetUnjoinedWaitingCustomOnlineWarInfos(e: egret.Event): void {
            const data = e.data as ProtoTypes.IS_GetUnjoinedWaitingCustomOnlineWarInfos;
            if (!data.errorCode) {
                TemplateMap.TemplateMapModel.addMapInfos(data.mapInfos);
                JoinWarModel.setWarInfos(data.warInfos);
                Notify.dispatch(Notify.Type.SGetUnjoinedWaitingCustomOnlineWarInfos, data);
            }
        }

        export function reqJoinCustomOnlineWar(waitingWarId: number, playerIndex: number, teamIndex: number): void {
            NetManager.send({
                actionCode : ActionCode.C_JoinCustomOnlineWar,
                infoId     : waitingWarId,
                playerIndex: playerIndex,
                teamIndex  : teamIndex,
            });
        }
        function _onSJoinCustomOnlineWar(e: egret.Event): void {
            const data = e.data as ProtoTypes.IS_JoinCustomOnlineWar;
            if (!data.errorCode) {
                Notify.dispatch(Notify.Type.SJoinCustomOnlineWar, data);
            }
        }
    }
}
