/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import BaseModel from 'base/model'

class ModelView {
    reason;

    set reason(val) {
        this.reason = val
    }
}

class ModelRequest extends BaseModel {
    reason = '';
    requestId = '';
    merchantId = '';
    storeId = '';
    cardNumber = '';
    cif = '';
    status=''

    constructor() {
        super()
    }

    setReason(val) {
        this.reason = val;
        return this;
    }

    setRequestId(val) {
        this.requestId = val;
        return this;
    }

    setMerchantId(val) {
        this.merchantId = val;
        return this;
    }

    setStoreId(val) {
        this.storeId = val;
        return this;
    }

    setCardNumber(val) {
        this.cardNumber = val;
        return this;
    }

    setCif(val) {
        this.cif = val;
        return this;
    }

    setStatus(val) {
        this.status = val;
        return this;
    }
}

export {ModelView, ModelRequest}