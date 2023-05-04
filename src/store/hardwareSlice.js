// src/store/hardwareSlice.js
import { createSlice } from '@reduxjs/toolkit';




const initialState = {
    hardwareData: [{
        "auditeur": [

        ],
        "demandeur": [

        ],
        "valueStatusMenu": 0,
        "datas": [],
        "forms": {
        },
        "checkboxAudit": [
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
    const auditOriginObj = auditOrigin.reduce((acc, curr) => {
        acc[curr.name] = curr;
        return acc;
    }, {});

    const totalElements = Object.values(auditOriginObj).filter((value) => {
        return value.optionalField === "no";
    }).length;

    let filledElements = audit !== undefined
        ? Object.entries(audit).filter(([key, value]) => {
            if (auditOriginObj.hasOwnProperty(key)) {
                if (auditOriginObj[key].optionalField === "no") {
                    return value !== '' && value !== null && (typeof value === 'undefined' || value.length !== 0);
                }
            }
            return false;
        }).length
        : 0;

       let resultat = (filledElements / totalElements) * 100
    return isNaN(resultat) ? 0 : resultat;
};


export const updateAuditStatus = (obj, formCurrentValues, formValues) => {
    let status = 1;
    if (formCurrentValues && Object.values(formCurrentValues).length > 0) {
        const progressPercentage = calculatePercentage(obj.audit, formValues)
        if (progressPercentage === 100) {
            if (Object.values(formCurrentValues).some((value) => value === "NOK")) {
                status = 3;
            } else {
                status = 2;
            }
        } else {
            status = 1;
        }
    }
    return status ?? 1;
};



export const deleteElementToDatasAudit = (audit, array) => {
    let newObj = {}
    for (let data of array) {
        if (audit?.hasOwnProperty(data?.name)) {
            newObj[data?.name] = audit[data?.name]
        }

    }
    return newObj
}



export const hardwareSlice = createSlice({
    name: 'hardware',
    initialState,
    reducers: {
        fetchDataStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchDataSuccess: (state, action) => {
            let hardwareData = []
            hardwareData.push(action.payload)
            state.hardwareData = hardwareData
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
                let lastObj = { ...state.hardwareData[0].datas[index] }
                lastObj.gbook = action.payload.gbook
                lastObj.date = action.payload.date
                lastObj.auditor = action.payload.auditor
                lastObj.requester = action.payload.requester
                state.hardwareData[0].datas[index] = lastObj;
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
            let lastData = action.payload.data
            state.hardwareData[0].settings.fieldsForms[action.payload.index] = action.payload.fieldData;

            // Vérifier si state.hardwareData[0].form est défini avant d'itérer dessus
            if (state.hardwareData[0].forms) {
                // Itérer sur chaque clé (category) de l'objet form
                Object.keys(state.hardwareData[0].forms).forEach(category => {

                    let index = 0
                    for (let item of state.hardwareData[0].forms[category]) {
                        if (item.name === action.payload.data.name) {
                            state.hardwareData[0].forms[category][index] = action.payload.fieldData;

                            let index_data = 0
                            for (let data of state.hardwareData[0].datas) {
                                if (data.hasOwnProperty('audit')) {
                                    if (data.audit.hasOwnProperty(`${lastData.name}`)) {
                                        let obj = { ...data.audit }
                                        obj[action.payload.fieldData.name] = data.audit[`${lastData.name}`]
                                        delete data.audit[`${lastData.name}`]
                                        state.hardwareData[0].datas[index_data].audit = obj
                                    }
                                }
                                index_data++
                            }
                        }
                        index++
                    }
                });
            }
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

            let newdState = state.hardwareData[0]
            let newDatas = state.hardwareData[0].datas
            let newCheckbox = state.hardwareData[0].checkboxAudit

            let index = 0
            for (let data of newdState.datas) {
                if (data.category === action.payload.lastedName) {
                    newDatas[index].category = action.payload.categoryName
                }
                index++
            }

            index = 0
            for (let item of newCheckbox) {
                if (item.id === action.payload.lastedName) {
                    newCheckbox[index].id = action.payload.categoryName
                    newCheckbox[index].label = action.payload.categoryName
                }
                index++
            }

            newdState.data = newDatas
            newdState.checkboxAudit = newCheckbox
            state.hardwareData[0] = newdState

        },
        deleteCategory: (state, action) => {
            let forms = state.hardwareData[0].forms
            delete forms[action.payload]
            let index = findIndexDatas(state.hardwareData[0].checkboxAudit, action.payload)
            state.hardwareData[0].checkboxAudit.splice(index, 1);

        },
        addElementsToForm: (state, action) => {
            const { name, elements } = action.payload;
            let obj = {
                test: 0
            }
            let index = 0
            if (state.hardwareData[0].datas?.length > 0) {
                for (let data of state.hardwareData[0].datas) {
                    if (data.category === name) {
                        let newAudit = deleteElementToDatasAudit(data.audit, elements)
                        state.hardwareData[0].datas[index].audit = newAudit
                        state.hardwareData[0].datas[index].progress = calculatePercentage(newAudit, elements)
                        state.hardwareData[0].datas[index].status = updateAuditStatus(newAudit, obj , elements)
                    }
                    index++
                }
            }
            state.hardwareData[0].forms[name] = elements;
        },
        updateSelectedData: (state, action) => {
            const { obj } = action.payload;
            const index = state.hardwareData[0].datas.findIndex(item => item.id === obj.id);
            state.hardwareData[0].datas[index] = obj;
        },
        updateFieldsForms: (state, action) => {
            state.hardwareData[0].settings.fieldsForms = action.payload
        },
        updateImportConfig: (state, action) => {
            state.hardwareData[0] = action.payload
        },
        updateImportBDD: (state, action) => {
            state.hardwareData[0].bdd = action.payload
        },
        resetDatas: (state,) => {
            state.hardwareData[0].datas = []
        }
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
    updateSelectedData,
    updateFieldsForms,
    updateImportConfig,
    updateImportBDD,
    resetDatas
} = hardwareSlice.actions;
export const selectHardwareData = (state) => state.hardware.hardwareData[0];
export default hardwareSlice.reducer;
