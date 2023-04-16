// src/store/hardwareSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    hardwareData: [{
        "auditeur": [
            "Samir M.",
            "Mathieu G.",
            "Franck P."
        ],
        "demandeur": [
            "Djamel S.",
            "Pascal C.",
            "Lauris M."
        ],
        "valueStatusMenu": 0,
        "datas": [],
        "forms": {
            "prod": [
                {
                    "label": "Aspect visuel",
                    "name": "aspVisuel",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sod"
                },
                {
                    "label": "batterie présente ?",
                    "name": "batPresente",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sof"
                },
                {
                    "label": "Etat actuel",
                    "name": "etatActu",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sow"
                },
                {
                    "label": "Commentaire du service",
                    "name": "commentServ",
                    "type": "text",
                    "id": "lg5g9sox"
                }
            ],
            "ecom": [],
            "audit écran": [
                {
                    "label": "Aspect visuel",
                    "name": "aspVisuel",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sod"
                },
                {
                    "label": "Rayures écran",
                    "name": "rayEcran",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9soe"
                },
                {
                    "label": "Etat actuel",
                    "name": "etatActu",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sow"
                },
                {
                    "label": "Nettoyage du produit ?",
                    "name": "netProduit",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sou"
                },
                {
                    "label": "Commentaire du service",
                    "name": "commentServ",
                    "type": "text",
                    "id": "lg5g9sox"
                }
            ],
            "préparation": [
                {
                    "label": "Aspect visuel",
                    "name": "aspVisuel",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sod"
                },
                {
                    "label": "Rayures écran",
                    "name": "rayEcran",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9soe"
                },
                {
                    "label": "batterie présente ?",
                    "name": "batPresente",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sof"
                },
                {
                    "label": "Esthétique batterie",
                    "name": "estheBatt",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sog"
                },
                {
                    "label": "Numéro de série batterie",
                    "name": "numSerieBatt",
                    "type": "text",
                    "id": "lg5g9soh"
                },
                {
                    "label": "Numéro de série BIOS",
                    "name": "numSerieBios",
                    "type": "text",
                    "id": "lg5g9soi"
                },
                {
                    "label": "Mot de passe Bios ?",
                    "name": "mdpBios",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9soj"
                },
                {
                    "label": "Reset Bios ?",
                    "name": "resetBios",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sok"
                },
                {
                    "name": "installWin",
                    "label": "installation windows ",
                    "type": "select",
                    "id": "lg5hwnym",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ]
                },
                {
                    "name": "actCleWin",
                    "label": "activation clé windows",
                    "type": "text",
                    "id": "lg5hx87a"
                }
            ]
        },
        "checkboxAudit": [
            {
                "label": "prod",
                "name": "group1",
                "type": "radio",
                "id": "prod"
            },
            {
                "label": "ecom",
                "name": "group1",
                "type": "radio",
                "id": "ecom"
            },
            {
                "label": "audit écran",
                "name": "group1",
                "type": "radio",
                "id": "audit écran"
            },
            {
                "label": "préparation",
                "name": "group1",
                "type": "radio",
                "id": "préparation"
            }
        ],
        "settings": {
            "select": {
                "options": [
                    "",
                    "OK",
                    "NOK",
                    "INDISPONIBLE",
                    "MANQUANT",
                    "NON VENDABLE",
                    "A DEMANTELER",
                    "VENDABLE",
                    "NON ELIGIBLE E-COM",
                    "ELIGIBLE E-COM"
                ]
            },
            "fieldsForms": [
                {
                    "label": "Aspect visuel",
                    "name": "aspVisuel",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sod"
                },
                {
                    "label": "Rayures écran",
                    "name": "rayEcran",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9soe"
                },
                {
                    "label": "batterie présente ?",
                    "name": "batPresente",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sof"
                },
                {
                    "label": "Esthétique batterie",
                    "name": "estheBatt",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sog"
                },
                {
                    "label": "Numéro de série batterie",
                    "name": "numSerieBatt",
                    "type": "text",
                    "id": "lg5g9soh"
                },
                {
                    "label": "Numéro de série BIOS",
                    "name": "numSerieBios",
                    "type": "text",
                    "id": "lg5g9soi"
                },
                {
                    "label": "Mot de passe Bios ?",
                    "name": "mdpBios",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9soj"
                },
                {
                    "label": "Reset Bios ?",
                    "name": "resetBios",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sok"
                },
                {
                    "label": "Selection UEFI ?",
                    "name": "uefi",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sol"
                },
                {
                    "label": "Partionnement du systeme de stockage ?",
                    "name": "partHDD",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9som"
                },
                {
                    "label": "Fonctionnement caméra ?",
                    "name": "camera",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9son"
                },
                {
                    "label": "Fonctionnement USB ?",
                    "name": "usb",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9soo"
                },
                {
                    "label": "Fonctionnement audio ?",
                    "name": "audio",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sop"
                },
                {
                    "label": "Fonctionnement clavier ?",
                    "name": "clavier",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9soq"
                },
                {
                    "label": "Fonctionnement prise réseau ?",
                    "name": "prise réseau",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sor"
                },
                {
                    "label": "Fonctionnement touchpad ?",
                    "name": "touchpad",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sos"
                },
                {
                    "label": "Fonctionnement ecran",
                    "name": "ecran",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sot"
                },
                {
                    "label": "Nettoyage du produit ?",
                    "name": "netProduit",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sou"
                },
                {
                    "label": "Vérification chargeur",
                    "name": "verifChargeur",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sov"
                },
                {
                    "label": "Etat actuel",
                    "name": "etatActu",
                    "type": "select",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ],
                    "id": "lg5g9sow"
                },
                {
                    "label": "Commentaire du service",
                    "name": "commentServ",
                    "type": "text",
                    "id": "lg5g9sox"
                },
                {
                    "name": "installWin",
                    "label": "installation windows ",
                    "type": "select",
                    "id": "lg5hwnym",
                    "options": [
                        "",
                        "OK",
                        "NOK",
                        "INDISPONIBLE",
                        "MANQUANT",
                        "NON VENDABLE",
                        "A DEMANTELER",
                        "VENDABLE",
                        "NON ELIGIBLE E-COM",
                        "ELIGIBLE E-COM"
                    ]
                },
                {
                    "name": "actCleWin",
                    "label": "activation clé windows",
                    "type": "text",
                    "id": "lg5hx87a"
                }
            ],
            "formCategorySelected": "prod",
            "natureDemande": {
                "options": [
                    "AUDIT"
                ]
            },
            "demande": {
                "options": [
                    "NON VENDABLE",
                    "A DEMANTELER",
                    "VENDABLE",
                    "NON ELIGIBLE E-COM",
                    "ELIGIBLE E-COM"
                ]
            },
            "statut": {
                "options": [
                    "A TRAITER",
                    "EN COURS",
                    "TERMINE"
                ]
            }
        },
        "bdd": []
    }],
    loading: false,
    error: null
};

export const isUnique = (item, datas, lastedItem, property) => {
    let arrayDatas = datas.filter((data) => data[property] !== lastedItem)
    return !arrayDatas.some((data) => data[property] === item)
};

export const findIndexDatas = (datas, property, value) => {
    return datas.findIndex((data) => data[property] === value);
}


export const calculatePercentage = (audit, auditOrigin) => {
    const totalElements = Object.keys(auditOrigin).length;
    const filledElements = Object.values(audit).filter((value) => value !== '' && value !== null).length;
  
    return (filledElements / totalElements) * 100;
  };
  


export const hardwareSlice = createSlice({
    name: 'hardware',
    initialState,
    reducers: {
        fetchDataStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchDataSuccess: (state, action) => {
            state.hardwareData = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchDataError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addNewAudit: (state, action) => {
            state.hardwareData[0].datas.push(action.payload);
        },
        updateAudit: (state, action) => {
            const index = state.hardwareData[0].datas.findIndex(
                (data) => data.gbook === action.payload.lastedGbook
            );

            if (index >= 0) {
                state.hardwareData[0].datas[index] = { ...action.payload };
            }
        },
        deleteAudit: (state, action) => {
            state.hardwareData[0].datas = state.hardwareData[0].datas.filter(
                (data) => data.gbook !== action.payload.gbook
            );
        },
        addAuditor: (state, action) => {
            state.hardwareData[0].auditeur.push(action.payload);
        },
        updateAuditor: (state, action) => {
            const { index, auditor } = action.payload;
            state.hardwareData[0].auditeur[index] = auditor;
        },
        deleteAuditor: (state, action) => {
            state.hardwareData[0].auditeur.splice(action.payload, 1);
        },
        deleteRequester: (state, action) => {
            state.hardwareData[0].demandeur.splice(action.payload, 1);
        },
        addRequester: (state, action) => {
            state.hardwareData[0].demandeur.push(action.payload);
        },
        updateRequester: (state, action) => {
            const { index, requester } = action.payload;
            state.hardwareData[0].demandeur[index] = requester;
        },
        addFieldForm: (state, action) => {
            state.hardwareData[0].settings.fieldsForms.push(action.payload);
        },
        updateFieldForm: (state, action) => {
            state.hardwareData[0].settings.fieldsForms[action.payload.index] = action.payload.fieldData;
        },
        deleteFieldForm: (state, action) => {
            state.hardwareData[0].settings.fieldsForms.splice(action.payload, 1);
        },
        addCategory: (state, action) => {
            let category = action.payload
            let obj_category = { label: category, name: 'group1', type: 'radio', id: category }
            state.hardwareData[0].checkboxAudit.push(obj_category)
            state.hardwareData[0].forms = { ...state.hardwareData[0].forms, [category]: [] };
        },
        updateCategory: (state, action) => {

            let value = state.hardwareData[0].forms[action.payload.lastedName]
            delete state.hardwareData[0].forms[action.payload.lastedName]
            state.hardwareData[0].forms = { ...state.hardwareData[0].forms, [action.payload.categoryName]: value };

        },
        deleteCategory: (state, action) => {
            let forms = state.hardwareData[0].forms
            delete forms[action.payload]
            let index = findIndexDatas(state.hardwareData[0].checkboxAudit, action.payload)
            state.hardwareData[0].checkboxAudit.splice(index, 1);

        },
        addElementsToForm: (state, action) => {
            const { name, elements } = action.payload;
            state.hardwareData[0].forms[name] = elements;
        },
        updateSelectedData: (state, action) => {
            const { obj } = action.payload;
            const index = state.hardwareData[0].datas.findIndex(item => item.id === obj.id);
            state.hardwareData[0].datas[index] = obj ;
        },

    }
});

export const {
    fetchDataStart,
    fetchDataSuccess,
    fetchDataError,
    addNewAudit,
    updateAudit,
    deleteAudit,
    addAuditor,
    updateAuditor,
    deleteAuditor,
    addRequester,
    updateRequester,
    deleteRequester,
    addFieldForm,
    updateFieldForm,
    deleteFieldForm,
    addCategory,
    updateCategory,
    deleteCategory,
    addElementsToForm,
    updateSelectedData
} = hardwareSlice.actions;
export const selectHardwareData = (state) => state.hardware.hardwareData[0];
export default hardwareSlice.reducer;
