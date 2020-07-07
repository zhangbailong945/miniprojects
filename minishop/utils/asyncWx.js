/*
*获取promise 形式 getSetting
*/
export const getSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
          
    })
}


/*
*获取promise 形式 chooseAddress
*/
export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
          
    })
}

/*
*获取promise 形式 openSetting
*/
export const openSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
          
    })
}


/*
*获取promise 形式 showModal
*/
export const showModal=({content})=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title:'提示',
            content:content,
            success: (result) => {
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            }
        });
          
    })
}

/*
*获取promise 形式 showModal
*/
export const showToast=({title})=>{
    return new Promise((resolve,reject)=>{
        wx.showToast({
            title: title,
            icon: 'none',
            duration:2000,
            mask: true,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
           
    })
}