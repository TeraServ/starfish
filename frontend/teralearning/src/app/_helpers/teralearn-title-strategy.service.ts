import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeralearnTitleStrategyService extends TitleStrategy{
  constructor(private readonly title: Title) { 
    super();
  }
  override updateTitle(snapshot: RouterStateSnapshot): void {
    console.log(snapshot)
    const detailOutlet = snapshot.root.children.find(r=>r.outlet === 'User Management')
    let title = this.buildTitle(snapshot);
    if(detailOutlet!== undefined){
      title = `${title} --> ${detailOutlet.routeConfig?.title}`
    }
    if(title!== undefined){
      this.title.setTitle(`TeraLearn - ${title}`);
    }
   }

}
