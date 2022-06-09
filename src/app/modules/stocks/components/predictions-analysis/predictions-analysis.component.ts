import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SubscriptionsService } from 'src/app/core/services/subscription/subscription.service';
import { Subscription } from 'src/app/modules/dashboard/models/subscription';

@Component({
  selector: 'app-predictions-analysis',
  templateUrl: './predictions-analysis.component.html',
  styleUrls: ['./predictions-analysis.component.scss'],
})
export class PredictionsAnalysisComponent implements OnInit {
  ticker: string = '';
  algorithm: string = "TS_SSA";

  userSubscription: BehaviorSubject<Subscription>;

  graphVisible = true;


  currentAlgorithmIndex: number = 0;
  ALGS_LIST: string[] = ['TS_SSA', 'T_FTO', 'T_SDCA', 'T_FFO', 'T_LBFP']
  ALGS_NAMES: string[] = ['Single spectrum analysis', 'Fast tree tweedie',
    'Stochastic Dual Coordinate Ascent', 'Fast forest', 'Lbfgs Poisson Regression']


  constructor(private route: ActivatedRoute,
    private subscriptionService: SubscriptionsService,
    ) {
    this.userSubscription = this.subscriptionService.userSubscription;
    subscriptionService.checkRemoteSubcription()
    this.ticker = this.route.snapshot.paramMap.get('ticker') || '';
  }

  chooseNextAlgorithm() {
    this.currentAlgorithmIndex = (++this.currentAlgorithmIndex) % this.ALGS_LIST.length
    this.algorithm = this.ALGS_LIST[this.currentAlgorithmIndex]
  }
  choosePreviousAlgorithm() {
    this.currentAlgorithmIndex = (--this.currentAlgorithmIndex + this.ALGS_LIST.length) % this.ALGS_LIST.length
    this.algorithm = this.ALGS_LIST[this.currentAlgorithmIndex]
  }

  ngOnInit(): void {}
}
