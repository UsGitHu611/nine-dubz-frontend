import {useEffect} from "react";
import {UPLOAD_STATUS_NEXT_CHUNK, UPLOAD_STATUS_COMPLETE, UPLOAD_STATUS_ERROR} from "../socket-enum.js"
import {studioStore} from "@modules/studioPanel/store/store.js";
import {useShallow} from "zustand/react/shallow";
import {App} from "antd";

export const useUploadFile = () => {
    const { message } = App.useApp();

    const {
        file,
        fileData,
        isConnected,
        setShowModal,
        setIsConnected,
        setFilePos,
        setIsLoadFile,
    } = studioStore(
        useShallow(state => ({
            file: state.file,
            setWs : state.setWs,
            setFilePos: state.setFilePos,
            fileData: state.fileData,
            isConnected: state.isConnected,
            setShowModal: state.setShowModal,
            setIsLoadFile: state.setIsLoadFile,
            setIsConnected: state.setIsConnected,
            abortConnection: state.abortConnection
        }))
    );

    let blob;
    let filePos = 0;
    let chunk = 1024 * 1024;
    let reader = new FileReader();

    const readBlob = () => {
        let start = filePos;
        let end = start + chunk
        if (end > file.size) {
            end = file.size;
        }
        blob = file.slice(start, end);
        reader.readAsArrayBuffer(blob);
    }

    const showMessage = async () => {
        setShowModal(false);
        setIsConnected(false);
        message.error({
            type: 'error',
            content: 'Ошибка загрузки видео',
        })
    }

    useEffect(()=> {

        if(isConnected){
            const ws = new WebSocket(`${import.meta.env.VITE_DEV_WS_URL}/api/movie/user/upload`);
            ws.binaryType = "arraybuffer";

            document.addEventListener("wsClose", () => ws.close())

            ws.onopen = function(){
                ws.send(JSON.stringify(fileData));
            }

            reader.onloadend = function(e) {

                if (e.target.readyState === FileReader.DONE){
                    ws.send(blob);
                    filePos += blob?.size;
                    setFilePos(blob?.size);
                }
            }

            ws.onmessage = function (e) {
                const data = JSON.parse(e.data);

                if(data.status === UPLOAD_STATUS_NEXT_CHUNK){
                    readBlob();
                }else if(data.status === UPLOAD_STATUS_ERROR){
                    showMessage();
                    ws.close();
                }else if(data.status === UPLOAD_STATUS_COMPLETE){
                    setIsLoadFile(true)
                    ws.close();
                }
            }

            ws.onerror = function() {
                showMessage();
                ws.close();
                return false;
            };
        }

        return () => setIsConnected(false);

    },[isConnected])

}