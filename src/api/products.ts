import _ from "lodash";
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
        const companies: string[] = _.uniq(
            data.map((item: Product) => item.company)
        );
        data = data.map((product: Product) => {
            return {
                ...product,
                category: _.isNil(product.category) || product.category == "" ? "other" : product.category,
                subcategory: _.isNil(product.subcategory) || product.subcategory == "" ? "other" : product.subcategory
            }
        })
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
            lang: {
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
                    "items": "פריטים",
                },
                "sales": {
                    "title": "השאירו פרטים לקבלת הצעת מחיר",
                    'fields': {
                        "name": "שם פרטי ומשפחה",
                        "email": "מייל",
                        "phone": "טלפון נייד",
                        "message": "הודעה",
                        'submit': "שלח"
                    },
                    "validation": {
                        "required": "שדה חובה",
                        "invalid_email": "מייל לא תקין",
                        "invalid_phone": "מספר לא תקין"
                    },
                    "ads": "כל הפריטים במלאי במחירים 50% עד 60% הנחה.",
                    "ads_description": "*שימו לב, הצעת מחיר תענה רק עבור כמויות גדולות של פריטים. לא ניתן לקבל הצעת מחיר עבור פריטים בודדים"
                },
                category: {
                    "nav": {
                        "all_companies": "כל החברות",
                        "company": "חברת",
                        "categories": "קטגוריות",
                        "products": "מוצרים",
                        "our_products": "המוצרים שלנו"
                    },
                    titles: {
                        drills: 'מקדחים ',
                        other: 'אחר',
                        inserts: 'לוחיות',
                        milling: 'כרסומים',
                        blades: 'להבים',
                        extensiones: 'מאריכים',
                        adapters: 'מתאמים',
                        shanks: 'קנים',
                        reamer: 'מקדדים'
                    }
                },
                "product": {
                    "id": 'מק"ט',
                    "company": "חברה",
                    "series": "סדרה",
                    "desciption": "תיאור",
                    "amount": "כמות במלאי",
                    "grade": "דרגה",
                },
                subcategory: {
                    titles: {
                        drills: 'מקדחים ',
                        other: 'אחר',
                        inserts: 'לוחיות',
                        milling: 'כרסומים',
                        blades: 'להבים',
                        extensiones: 'מאריכים',
                        adapters: 'מתאמים',
                        shanks: 'קנים',
                        reamer: 'מקדדים',
                        engraving: "",
                        high_feed_milling_inserts: 'לוחיות לכרסום בהזנה גבוהה',
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
                        facing_milling_inserts: "לוחיות לכרסום חזיתי",
                        series: {
                            EHBHS: "כרסום אצבע מוצק, אף כדורי",
                            EHBLH: "כרסום אצבע מוצק, אף כדורי, קנה ארוך",
                            EHBRC: "כרסום אצבע מוצק",
                            EHBRT: "כרסום אצבע מוצק",
                            EHBUH: "כרסום אצבע מוצק, אף כדורי, קנה קצר",

                            EHCLH: "כרסום אצבע מוצק, רדיוס פינתי, קנה ארוך",
                            EHCRC: "כרסום אצבע מוצק, רדיוס פינתי",
                            EHCSH: "כרסום אצבע מוצק, רדיוס פינתי, סטנדרטי",
                            EHCUH: "כרסום אצבע מוצק, רדיוס פינתי, קנה קצר",

                            EHSCC: "כרסום אצבע מוצק",
                            EHSLH: "כרסום אצבע מוצק",

                            EHSS: "כרסום אצבע מוצק",
                            EHSSS: "כרסום אצבע מוצק",

                            EHWSA: "כרסום אצבע מוצק, רדיוסים משתנים",
                            ALX: "ראש כרסום מהיר לטיטניום/אלומיניום",

                            APKT: "אינסרטים לכרסום, מתק״ש מצופה (90°)",
                            APMT: "אינסרטים לכרסום מתק״ש מצופה (90°)",

                            DSSEM: "ראש כרסום מודולרי",

                            HEP: "כרסום שטח עם לוחיות משובעות",

                            MBN: "ראש כרסום כדורי מתברג",

                            SSEM: "כרסום מודולרי",

                            TDM: "כרסום שטח עם לוחיות עגולות",
                            AHFM: "כרסום מודולרי בהזנה גבוהה",

                            MBX: "ראש כרסום כדורי מתברג",

                            MCM: "ראש כרסום 45° מתברג עם לוחיות מתחלפות",
                            MEC: "ראש כרסום מתברג עם לוחיות מתחלפות",
                            MIC: "ראש כרסום מתברג עם לוחיות מתחלפות",

                            MPM: "ראש כרסום מתברג קומפקטי עם לוחיות אינדקסביליות",
                            MQX: "ראש כרסום מתברג לכרסום שטח עם לוחיות מתחלפות",

                            MRN: "ראש כרסום כדורי מתברג עם קירור פנימי",
                            MRX: "ראש כרסום כדורי מתברג",

                            MSH: "ראש כרסום HFM מתברג (הזנה גבוהה)",
                            MSW: "ראש כרסום כדורי DIJET עם לוחיות מתחלפות",

                            MXD: "ראש כרסום מתברג בזווית 95° עם לוחיות מתחלפות",

                            SDH: "ראש כרסום מתברג עם לוחיות רדיוס (High rigidity)",
                            EXSKS: "כרסום הזנה גבוהה עם אינסרט 6 פאות (WN09)",
                            EXTDM: "כרסום הזנה גבוהה עם אינסרט 6 פאות (WN09)",
                            DDM: "כרסום אצבע עם לוחיות עגולות",

                            DVSCMS: "כרסום אצבע מתק״ש לפלדות קשות",
                            DVSEHM: "כרסום אצבע מתק״ש לפלדות קשות (Hardened)",

                            DZ_OCRS: "כרסום אצבע מתק״ש לריסוק פלדות קשות וברזל יציקה",

                            ENSCS: "כרסום אצבע לאלומיניום",
                            ENSSB: "כרסום הזנה גבוהה לאלומיניום",
                            ENSSC: "כרסום אצבע לאלומיניום",
                            ENSSH: "כרסום אצבע לאלומיניום (High polish side)",
                            ENSSP: "כרסום אצבע לאלומיניום (Side roughing)",
                            ENSSR: "כרסום אצבע לאלומיניום (Roughing)",
                            ENSSS: "כרסום אצבע לאלומיניום",

                            EPBLC: "כרסום אצבע כדורי",

                            EPSCVD: "כרסום אצבע אנטי-ויברציה (unequal flute spacing)",
                            EPSSVC: "כרסום אצבע לחריצים (Slotting)",

                            HST: "כרסום אצבע להזנה גבוהה (High Speed / High Feed)",

                            PME: "כרסום אצבע עם קירור פנימי (EO inserts)",

                            SECL: "כרסום אצבע/שיקוע ארוך רב-תכליתי",
                            SECM: "כרסום אצבע/שיקוע קצר רב-תכליתי",

                            SEM: "כרסום אצבע מתק״ש לשימוש כללי",

                            SKS: "כרסום אצבע ל-HFM (High Feed Milling / Indexable)",

                            SWB: "כרסום אצבע כדורי ארוך (Swing Ball)",
                            "DV-SCMS": 'כרסום אצבע מתק"ש לפלדות קשות',
                            "DV-SEHM": 'כרסום אצבע מתק"ש לפלדות קשות',
                            "DZ-OCRS": 'כרסום אצבע מתק"ש ריסוק',
                            BNM: "להבים מתק״ש כדוריים (Mirror Ball)",
                            RNM: "להבים מתק״ש שטוחים עם רדיוס (Mirror Rad)",
                            FRM: "להבי כרסום רדיוס שטוח",
                            GRM: "להבי כרסום שטוח לרדיוס גדול (Heavy duty face milling)",
                            HRM: "להבי כרסום שטוח לקידמה מהירה (High Feed Cutting / HFC)",
                            "132A": "להבי קידוח HSSCo מצופים TiAlN (מערכת T-A)",
                            "150A": "להבי קידוח HSSCo מצופים TiAlN (T-A) – מידות בינוניות",
                            "150T": "להבי קידוח HSS מצופים TiN (T-A) – כולל Flat Bottom",
                            "151A": "להבי קידוח HSSCo מצופים TiAlN (T-A) – קוטר גדול",
                            "151T": "להבי קידוח HSS מצופים TiN (T-A) – קידוח + Flat Bottom",
                            "152A": "להבי קידוח T-A HSSCo מצופים TiAlN – Heavy duty",
                            "152T": "להבי קידוח T-A HSS מצופים TiN – Flat / standard",
                            "153T": "להבי קידוח T-A HSSCo – קטרים גדולים וגימור שטוח",

                            "15ZA": "להבי קידוח HSSCo T-A – קוטר קטן",
                            "15ZT": "להבי קידוח HSS T-A – Flat Bottom",

                            "180A": "להבי קידוח HSS M48 מצופים TiAlN (T-A system)",
                            "181A": "להבי קידוח HSSCo M48 – מגוון קטרים",
                            "182A": "להבי קידוח M48 T-A – קטרים גדולים",

                            "18YA": "להבי קידוח HSS T-A – קטרים קטנים",
                            "18ZA": "להבי קידוח HSSCo T-A – קטרים קטנים",

                            "132A_TA": "להבי קידוח HSSCo TiAlN – T-A system (כללי)",

                            "1C20A": "להבי קידוח מערכת M.G.K20 – T-A",
                            "1C21A": "להבי קידוח M.G.K20 – T-A (קטרים בינוניים)",
                            "1C50A": "להבי קידוח M.G.P40 – T-A",
                            "1C51A": "להבי קידוח M.G.P40 – T-A (קטרים בינוניים/גדולים)",
                            "1C52A": "להבי קידוח M.G.P40 – T-A (קוטר גדול)",
                            "BNMM": "להב כדורי עגול",
                            "BNMS": "להב כדורי עגול",
                            EOHW: "אינסרטים לכרסום הזנה גבוהה לפלדה מחוסמת (Right hand)",

                            EOMW: "אינסרטים לכרסום הזנה גבוהה (Right hand)",

                            WDMT: "אינסרטים לכרסום הזנה גבוהה כללי",
                            WDMW: "אינסרטים לכרסום הזנה גבוהה כללי",

                            WNMU: "אינסרטים לכרסום הזנה גבוהה 6 פאות עבודה",

                            WOMT: "אינסרטים לכרסום הזנה גבוהה",
                            WOMW: "אינסרטים לכרסום הזנה גבוהה (Coated variants)",

                            XDHW: "אינסרטים לכרסום בזווית 70° (DIJET)",
                            XDMT: "אינסרטים לכרסום משובעים (7 פאות עבודה)",
                            XDMW: "אינסרטים לכרסום משובעים (7 פאות עבודה)",
 ZPMT: "אינסרטים לכרסום ושיקוע (ימני/שמאלי), כולל גרסאות מלוטשות לפיניש",
                            YPHW: "אינסרטים לכרסום הזנה גבוהה לפלדה מחוסמת / CERMET",
                              RDGT: "אינסרטים עגולים מושחזים לאלומיניום (High finish / Aluminum optimized)",

  RDHT: "אינסרטים עגולים לעיבוד טיטניום וסגסוגות קשות (Uncoated / rough applications)",

  RDHX: "אינסרטים עגולים מצופים לעיבוד כללי וכבד (PVD / carbide coated)",

  RDMT: "אינסרטים עגולים מושחזים מצופים לעיבוד כללי (Precision milling)",

  RDMW: "אינסרטים עגולים מצופים לעיבוד כללי/גימור (General purpose)",

  RDMX: "אינסרטים עגולים מיוחדים (Special geometry / limited variants)"
                        }
                    }
                }
            }
        };
    } catch (error) {
        console.error('Error in getProducts:', error);
        return initial;
    }
};