
namespace TinyWars.GameUi {
    import Helpers = Utility.Helpers;
    import Types   = Utility.Types;

    export class UiButton extends eui.Button {
        private _imgExtra: eui.Image;
        private _imgRed  : eui.Image;

        public constructor() {
            super();

            this.addEventListener(egret.Event.COMPLETE, this._onCompleted, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this._onTouchEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this._onTouchReleaseOutside, this);
        }

        public checkRedVisible(): boolean {
            return this._imgRed ? this._imgRed.visible : false;
        }
        public setRedVisible(visible: boolean): void {
            if (this._imgRed) {
                this._imgRed.visible = visible;
            }
        }

        public checkExtraVisible(): boolean {
            return this._imgExtra ? this._imgExtra.visible : false;
        }
        public setExtraVisible(visible: boolean): void {
            if (this._imgExtra) {
                this._imgExtra.visible = visible;
            }
        }
        public setExtraSource(source: string): void {
            if (this._imgExtra) {
                this._imgExtra.source = source;
            }
        }

        private _onCompleted(e: egret.Event): void {
            this.removeEventListener(egret.Event.COMPLETE, this._onCompleted, this);

            this.setRedVisible(false);
            this.setExtraVisible(false);
        }
        private _onTouchBegin(e: egret.TouchEvent): void {
            Helpers.changeColor(this, Types.ColorType.White, 50);
        }
        private _onTouchEnd(e: egret.TouchEvent): void {
            Helpers.changeColor(this, Types.ColorType.Origin);
        }
        private _onTouchReleaseOutside(e: egret.TouchEvent): void {
            Helpers.changeColor(this, Types.ColorType.Origin);
        }
    }
}
