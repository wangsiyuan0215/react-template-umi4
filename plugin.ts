/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import type { IApi } from 'umi';

export default (api: IApi) => {
    api.addHTMLStyles(() => [
        `.animate-spin {
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }`
    ]);
    api.modifyHTML(($) => {
        $('head').append(`<title>${api.userConfig.define.APP_NAME as string}</title>`);
        $('#root').innerHTML = `
        <div
            style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 80%;
            "
        >
            <p style="font-weight: bold; font-size: 28px; text-align: center">
                🎉 欢迎使用 ${api.userConfig.define.APP_NAME} / Welcome to using ${api.userConfig.define.APP_NAME} 🎉
            </p>
            <div style="margin-top: 32px; text-align: center">
                <div class="animate-spin" style="display: inline-block">⚙️</div>
                <i>系统加载中，请稍后... / The system is loading, please wait...</i>
            </div>
        </div>`;
        return $;
    });
};
