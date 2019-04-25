import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'textLimit' })
export class textLimitPipe implements PipeTransform {
    transform(text: string, args: string[]) {
        const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
        const trail = args.length > 1 ? args[1] : '...';
        if(text.length > limit){
            text = text.slice(0,limit)+trail;
        }
        return text;
    }
}