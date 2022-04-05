// axios 请求

import instance from './hanlder.js'

const request = class{
    constructor(url, arg) {
        this.url = url
        this.arg = arg
    }

    // post
    doPost() {
        return new Promise((resolve, reject)=> {
            instance.post(this.url, this.arg)
            .then(res=>{
                resolve(res)
            })
            .catch(err =>{
                reject(err)
            })
        })
    }

    // get
    doGet() {
        return new Promise((resolve, reject)=>{
            instance.get(this.url)
            .then(res=>{
                resolve(res)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }
}

export default request
