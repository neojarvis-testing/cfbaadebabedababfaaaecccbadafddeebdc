// import { TestBed } from '@angular/core/testing';

// import { AdminService } from './admin.service';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('AdminService', () => {
//   let service: AdminService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule]
//     });
//     service = TestBed.inject(AdminService);
//   });

//   fit('Week5_Day3_should create AdminServices', () => {
//     expect(service).toBeTruthy();
//   });

//   // fit("getteams Method exists", () => {
//   //   expect(service.getTeams).toBeTruthy();
//   // })
// });


// // import { TestBed } from '@angular/core/testing';

// // import { AdminService } from './admin.service';
// // import { HttpClientTestingModule } from '@angular/common/http/testing';

// // describe('AdminService', () => {
// //   let service: AdminService;

// //   beforeEach(() => {
// //     TestBed.configureTestingModule({
// //       imports: [HttpClientTestingModule]
// //     });
// //     service = TestBed.inject(AdminService);
// //   });

// //   fit('Week5_Day3_should create AdminServices', () => {
// //     expect(service).toBeTruthy();
// //   });

// //   // fit("getteams Method exists", () => {
// //   //   expect(service.getTeams).toBeTruthy();
// //   // })
// // });

import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from './admin.service';
import { Team } from '../../models/team.model';
import { Player } from '../../models/player.model';
import { HttpTestingController } from '@angular/common/http/testing';

describe('AdminService Integration Tests', () => {
  let service: AdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AdminService]
    });
    service = TestBed.inject(AdminService);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 3000;

  });

  // afterEach(() => {
  //   const httpMock = TestBed.inject(HttpTestingController);
  //   httpMock.verify(); // Verify that there are no open requests after each test
  // });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should retrieve teams from the backend', (done: DoneFn) => {
    service.getTeams().subscribe(
      (teams: Team[]) => {
        console.log(teams)
        expect(teams.length).toBeGreaterThan(0); // Check if any teams are retrieved
        done();
      },
      (error: any) => {
        fail('Failed to retrieve teams: ' + JSON.stringify(error));
      }
    );
  });

  fit('should create a new team via the backend', (done: DoneFn) => {
    const newTeam: Team = { id: 3, name: 'New Team', maximumBudget: 50000 };

    service.createTeam(newTeam).subscribe(
      (createdTeam: Team) => {
        expect(createdTeam).toEqual(newTeam);
        done();
      },
      (error: any) => {
        fail('Failed to create team: ' + JSON.stringify(error));
      }
    );
  });

  fit('should retrieve players from the backend', (done: DoneFn) => {
    service.getPlayers().subscribe(
      (players: Player[]) => {
        console.log(players)
        expect(players.length).toBeGreaterThan(0); // Check if any teams are retrieved
        done();
      },
      (error: any) => {
        fail('Failed to retrieve teams: ' + JSON.stringify(error));
      }
    );
  });



  // Write similar test cases for other methods (updateTeam, deleteTeam, getPlayers, createPlayer, updatePlayer, deletePlayer)

});
