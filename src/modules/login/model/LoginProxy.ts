
namespace TinyWars.Login {
    export namespace LoginProxy {
        import Notify     = Utility.Notify;
        import NotifyType = Utility.Notify.Type;
        import ProtoTypes = Utility.ProtoTypes;
        import NetManager = Network.Manager;
        import ActionCode = Network.Codes;

        export function init(): void {
            NetManager.addListeners([
                { msgCode: ActionCode.S_Login,    callback: _onSLogin,    },
                { msgCode: ActionCode.S_Register, callback: _onSRegister, },
                { msgCode: ActionCode.S_Logout,   callback: _onSLogout,   },
            ], LoginProxy);
        }

        export function reqLogin(account: string, password: string, isAutoRelogin: boolean): void {
            NetManager.send({
                C_Login: {
                    account,
                    password,
                    isAutoRelogin,
                },
            });
        }
        function _onSLogin(e: egret.Event): void {
            const data = e.data as ProtoTypes.IS_Login;
            if (!data.errorCode) {
                User.UserModel.updateOnLogin(data);
                Notify.dispatch(NotifyType.SLogin, data);
            }
        }

        export function reqRegister(account: string, password: string, nickname: string): void {
            NetManager.send({
                C_Register: {
                    account   : account,
                    password  : password,
                    nickname  : nickname,
                },
            });
        }
        function _onSRegister(e: egret.Event): void {
            const data = e.data as ProtoTypes.IS_Register;
            if (!data.errorCode) {
                Notify.dispatch(NotifyType.SRegister, data);
            }
        }

        export function reqLogout(): void {
            NetManager.send({
                C_Logout: {
                },
            });
        }
        function _onSLogout(e: egret.Event): void {
            const data = e.data as ProtoTypes.IS_Logout;
            if (!data.errorCode) {
                Notify.dispatch(NotifyType.SLogout, data);
            }
        }
    }
}
