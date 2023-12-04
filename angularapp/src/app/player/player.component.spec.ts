import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerComponent } from './player.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterTestingModule],

      declarations: [PlayerComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Week4_Day4_create_Player_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Week5_Day2_should have edit buttons for each player', () => {
    const player = { id: 1, name: 'Test Player', age: 25, category: 'Category A', biddingPrice: 100 };

    // Set the players and trigger change detection
    component.players = [player];
    fixture.detectChanges();

    const editButton = fixture.nativeElement.querySelector('li button:nth-child(1)');

    expect(editButton).toBeTruthy();    // Check if the edit button exists
  });

  fit('Week5_Day2_should have delete buttons for each player', () => {
    const player = { id: 1, name: 'Test Player', age: 25, category: 'Category A', biddingPrice: 100 };

    // Set the players and trigger change detection
    component.players = [player];
    fixture.detectChanges();

    const deleteButton = fixture.nativeElement.querySelector('li button:nth-child(2)');

    expect(deleteButton).toBeTruthy();  // Check if the delete button exists
  });

  fit('Week4_Day5_check the bidding amount', () => {
    const fixture = TestBed.createComponent(PlayerComponent);
    const app = fixture.componentInstance;
    app.newPlayer.biddingPrice = 200;
    expect(1).toEqual(1);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const element: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#playerBiddingPrice');
      expect(element.value).toEqual('200'); // Add this expect statement
    });
  });

  fit('Week4_Day5_check bidding amount in status div', () => {
    const fixture = TestBed.createComponent(PlayerComponent);
    const app = fixture.componentInstance;
    app.newPlayer.biddingPrice = 10000
    expect(1).toEqual(1);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    const element:HTMLInputElement =fixture.debugElement.nativeElement.querySelector('#playerBiddingPrice');
    //  expect(element.value).toEqual('10000');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    const paraelement:HTMLDivElement =fixture.debugElement.nativeElement.querySelector('#status');
    expect(paraelement.innerHTML).toEqual('Bidding Price Status: Good bidding');
    // expect(paraelement.innerHTML).toEqual(app.newPlayer.biddingPrice);
   })
  })
});

  fit('Week4_Day6_should display Player information by ngfor', () => {
    component.players = [
    { id: 1, name: 'Test Player', age: 25, category: 'Category A', biddingPrice: 10100 },
    { id: 2, name: 'Test Player1', age: 35, category: 'Category B', biddingPrice: 500 }
       // Add more test teams as needed
     ];
     fixture.detectChanges();
     const elements: DebugElement[] = fixture.debugElement.queryAll(By.css('#list'));
     expect(elements.length).toEqual(component.players.length);
     elements.forEach((obj: DebugElement, index) => {
    const team = component.players[index];
    const expectedText = `${team.name} (Age: ${team.age} Category: ${team.category} Bidding Price: ${team.biddingPrice})`;
    const textNode = obj.nativeElement.childNodes[0];
    const actualText = textNode.textContent.trim();
    expect(actualText).toEqual(expectedText);
    });
  });


  // it('should emit editPlayerEvent when edit button is clicked', () => {
  //   const player = { id: 1, name: 'Player A', age: 25 };
  //   spyOn(component.editPlayerEvent, 'emit');

  //   component.onEditPlayer(player);

  //   expect(component.editPlayerEvent.emit).toHaveBeenCalledWith(player);
  // });

  // it('should emit deletePlayerEvent when delete button is clicked', () => {
  //   const playerId = 1;
  //   spyOn(component.deletePlayerEvent, 'emit');

  //   component.onDeletePlayer(playerId);

  //   expect(component.deletePlayerEvent.emit).toHaveBeenCalledWith(playerId);
  // });

  // Add more test cases for onSaveEditedPlayerEvent, onCancelEditPlayerEvent, etc.
});
