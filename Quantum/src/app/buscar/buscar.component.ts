import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { LinkService } from '../services/link.service';

@Component({
  	selector: 'app-buscar',
  	templateUrl: './buscar.component.html'
})

export class BuscarComponent implements OnInit {

  	constructor( private dataService : DataService, private linkService : LinkService ) { }

	texto:string = '';
	obj:any[] = [];
	raw:string = '';
	links:any[] = [];

  	ngOnInit () {}

	search(){
		this.dataService.fetchData(this.texto).map(
			(data) => this.obj = data
		).subscribe(() => {
			this.saveLinks();
		});
		this.raw = this.dataService.getRawLink() + this.texto;
	}

	saveLinks(){
		for(let i of (this.obj as any).items){
			this.links.push(i.link);
		}
	}

	openLink(url:string){
		this.linkService.open(url);
	}

	get diagnostic() {
    	return JSON.stringify(this.links);
  	}

}
