import { requestPermission, sendNotification } from "@tauri-apps/api/notification";

export async function notify(title:string, body: string | undefined){
    requestPermission().then(perm => {
        if(perm != "denied"){
            sendNotification({title: title, body: body})
        }
    }).catch(err => {
        console.log(err)
    })
}

export async function requestNotification(){
    try {
        await requestPermission();
    } catch (err) {
        console.log(err)
    }
}