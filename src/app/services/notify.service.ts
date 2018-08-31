import { Injectable } from "@angular/core";
declare var $: any;
@Injectable()
export class NotifyService {

    constructor() {
    }
    notify(type: string, icon: string, message: string) {
        $.notify({
            // options
            icon: icon,
            message: message
        }, {
                element: 'body',
                position: null,
                type: type,
                allow_dismiss: true,
                placement: {
                    from: "bottom",
                    align: "right"
                },
                offset: 20,
                spacing: 10,
                z_index: 1031,
                timer: 1000,
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                }
            });
    }
}
