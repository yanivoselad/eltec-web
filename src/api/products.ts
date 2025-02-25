import { initial } from "lodash";
import { Product, promiseProduct, promiseProductInitial } from "types"
import { lambadaURL, recaptchaKEY } from "../consts";

declare global {
    interface Window {
        grecaptcha?: {
            ready: (callback: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}

export const getProducts = async (): Promise<promiseProduct> => {
    const initial: promiseProduct = promiseProductInitial;

    try {
        if (!window.grecaptcha) {
            return initial;
        }

        const token: string = await new Promise((resolve, reject) => {
            if (window.grecaptcha) {
                window.grecaptcha.ready(() => {
                    if (!window.grecaptcha) {
                        return reject('reCAPTCHA is not available');
                    }

                    window.grecaptcha
                        .execute(recaptchaKEY, { action: 'products' })
                        .then(resolve)
                        .catch(reject);
                });
            }
        });

        const response = await fetch(lambadaURL,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }});
        const data: promiseProduct = await response.json();

        return data;
    } catch (error) {
        console.error('Error in getProducts:', error);
        return initial;
    }
};