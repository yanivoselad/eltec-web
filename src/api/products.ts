import  _  from "lodash";
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
        const res = await fetch('/data.json');

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        let data = await res.json();
        const companies:string[] = _.uniq(
            data.map((item:Product) => item.company)
        );
        data = data.map((product:Product)=> {
            return {
                ...product,
                category: _.isNil(product.category) || product.category == "" ? "other" : product.category,
                subcategory: _.isNil(product.subcategory) || product.subcategory == "" ? "other" : product.subcategory
            }
        } )
        const categories = _(data)
        .groupBy('category')
        .map((items, category) => ({
            name: category,
            subcategories: _.uniq(items.map(i => i.subcategory))
        }))
        .value();

        console.log(categories)
        return {
            ...initial,
            products: data,
            companies,
            categories,
            lang:{
                    "nav": {
            "company": 'א.א. טכנולוגיות בע"מ',
            "home": "ראשי",
            "results": "תוצאות חיפוש",
            "found": "נמצאו",
            "totalresutls": "תוצאות",
            "find": "חיפוש מוצרים",
            "main_menu": "ראשי",
            "companies": "חברות",
            "loading": "טוען נתונים",
            "back": "לעמוד קודם",
            "nextizo": "לפריט הבא",
            "backizo": "לפריט הקודם",
            "all_rights": 'כל הזכויות שמורות ל-א.א. טכנולוגיות בע"מ',
            "sales": "לקבלת הצעת מחיר",
            "sending": "שולח",
            "success_sending": "בקשתכם נשלחה בהצלחה!",
            "handle_request": "תודה שפניתם אלינו, נחזור אליכם עם תשובה בהקדם",
            "back_to_main": "בחזרה לעמוד ראשי",
            "send_another": "לשליחת בקשה נוספת",
            "items" : "פריטים",
    },
        "sales": {
        "title": "השאירו פרטים לקבלת הצעת מחיר",
        'fields': {
            "name": "שם פרטי ומשפחה",
            "email": "מייל",
            "phone": "טלפון נייד",
            "message": "הודעה",
            'submit':"שלח"
        },
        "validation": {
            "required": "שדה חובה",
            "invalid_email": "מייל לא תקין",
            "invalid_phone":"מספר לא תקין"
        },
        "ads": "כל הפריטים במלאי במחירים 50% עד 60% הנחה.",
        "ads_description": "*שימו לב, הצעת מחיר תענה רק עבור כמויות גדולות של פריטים. לא ניתן לקבל הצעת מחיר עבור פריטים בודדים"
    },
               category:{
                        "nav": {
            "all_companies": "כל החברות",
            "company": "חברת",
            "categories": "קטגוריות",
            "products": "מוצרים",
            "our_products": "המוצרים שלנו"
        },
                    titles:{
                       drills:'מקדחים ',
                       other:'אחר',
                       inserts:'לוחיות',
                       milling:'כרסומים',
                       blades:'להבים',
                       extensiones:'מאריכים',
                       adapters: 'מתאמים',
                       shanks:'קנים',
                       reamer:'מקדדים'     
                    }
               },
               "product": {
        "id": 'מק"ט',
        "company":"חברה",
        "series": "סדרה",
        "desciption": "תיאור",
        "amount": "כמות במלאי",
        "grade": "דרגה",
    },
               subcategory:{
                    titles:{
                       drills:'מקדחים ',
                       other:'אחר',
                       inserts:'לוחיות',
                       milling:'כרסומים',
                       blades:'להבים',
                       extensiones:'מאריכים',
                       adapters: 'מתאמים',
                       shanks:'קנים',
                       reamer:'מקדדים',
                       engraving:"",
                       high_feed_milling_inserts:'לוחיות לכרסום בהזנה גבוהה',
                        finger_milling: "כרסום אצבע",
                        high_feed_milling: "כרסום הזנה גבוהה",
                        milling_heads: "ראשי כרסום",
                        solid_finger_milling: "כרסום אצבע מלא",
                        face_milling: "כרסום חזיתי",
                        flat_blade: "להב שטוח",
                        round_blade: "להב עגול",
                        drilling_blades: "להבי קידוח",
                        "מוטות כרסום": "מוטות כרסום",
                        rings: "טבעות",
                        drill_head: "ראש מקדח",
                        indexable: "לוחית מתחלף",
                        STUB: "מקדח קצר",
                        short_drills: "מקדחים קצרים",
                        MED: "מקדחים בינוניים",
                        long_drills: "מקדחים ארוכים",
                        "חותך כרסום בהברגה": "חותך כרסום להברגה",
                        round_insert: "לוחית עגול",
                        milling_inserts: "לוחיות לכרסום",
                        shoulder_milling_inserts: "לוחיות לכרסום כתף",
                        facing_milling_inserts: "לוחיות לכרסום חזיתי"
                    }
               }
            }
        };
    } catch (error) {
        console.error('Error in getProducts:', error);
        return initial;
    }
};