import { Hero } from './../herodetail/hero';
import { Component } from '@angular/core';

const HEROES: Hero[] = [
  { id: 11, name: 'Daredevil' },
  { id: 12, name: 'Deadpool' },
  { id: 13, name: 'Doctor Strange' },
  { id: 14, name: 'Apocalypse' },
  { id: 15, name: 'Gambit' },
  { id: 16, name: 'Gorgon' },
  { id: 17, name: 'Gravity' },
  { id: 18, name: 'Prodigy' },
  { id: 19, name: 'Red Hulk' },
  { id: 20, name: 'Psycho-Man' }
];


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent{
	title = 'Tour of Heroes';
	hero: Hero = {
		id: 1,
	  	name: 'Viper'
	};
	heroes = HEROES;
	selectedHero: Hero;
	onSelect(hero: Hero): void {
	  this.selectedHero = hero;
	}
}

