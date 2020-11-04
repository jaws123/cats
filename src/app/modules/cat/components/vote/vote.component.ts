import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ImageDto} from '@cat/dto/image-dto';
import {VoteDto} from '@cat/dto/vote-dto';
import {CatHttpService} from '@cat/services/cat-http.service';
import {AuthService} from '@shared/services/auth.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit, OnDestroy {

  image: ImageDto;
  private subscriptions: Subscription = new Subscription();

  constructor(private catHttpService: CatHttpService,
              private authService: AuthService) { }

  ngOnInit() {
    this.getImage();
  }

  iLikeIt() {
    this.vote(1);
  }

  iDontLikeIt() {
    this.vote(0);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private getImage() {
    this.subscriptions.add(this.getImageSubscription());
  }

  private getImageSubscription(): Subscription {
    return this.catHttpService.getImage().subscribe(result => {
      this.image = result[0];
    });
  }

  private vote(value: number) {
    const voteRequest = this.prepareVoteRequest(value);
    this.catHttpService.postVote(voteRequest).subscribe(() => this.getImage());
  }

  private prepareVoteRequest(value: number): VoteDto {
    return {
      image_id:  this.image.id,
      sub_id: this.authService.getSubId(),
      value
    };
  }
}
