import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Subscription } from 'src/app/modules/dashboard/models/subscription';
import {UserService} from "../../../../core/services/user.service";

@Component({
  selector: 'app-predictions-analysis',
  templateUrl: './predictions-analysis.component.html',
  styleUrls: ['./predictions-analysis.component.scss'],
})
export class PredictionsAnalysisComponent {
  ticker: string = '';

  graphVisible: boolean = true
  tableVisible: boolean = false

  algorithm: BehaviorSubject<string> = new BehaviorSubject<string>("TS_SSA");

  userSubscription: BehaviorSubject<Subscription>;


  currentAlgorithmIndex: number = 0;
  ALGS_LIST: string[] = ['TS_SSA', 'T_FTO', 'T_SDCA', 'T_FFO', 'T_LBFP']
  ALGS_NAMES: string[] = ['Single spectrum analysis', 'Fast tree tweedie',
    'Stochastic Dual Coordinate Ascent', 'Fast forest', 'Lbfgs Poisson Regression']


  constructor(private route: ActivatedRoute,
    private subscriptionService: UserService,
    ) {
    this.userSubscription = this.subscriptionService.userSubscription;
    subscriptionService.checkRemoteSubcription()
    this.ticker = this.route.snapshot.paramMap.get('ticker') || '';

    console.log(this.ticker)
  }

  chooseNextAlgorithm() {
    this.currentAlgorithmIndex = (++this.currentAlgorithmIndex) % this.ALGS_LIST.length
    this.algorithm.next(this.ALGS_LIST[this.currentAlgorithmIndex])
  }
  choosePreviousAlgorithm() {
    this.currentAlgorithmIndex = (--this.currentAlgorithmIndex + this.ALGS_LIST.length) % this.ALGS_LIST.length
    this.algorithm.next(this.ALGS_LIST[this.currentAlgorithmIndex])
  }

  viewChanged(event: any) {
    if (event.value == 'table') {
      this.tableVisible = true
      this.graphVisible = false
    } else {
      this.tableVisible = false
      this.graphVisible = true
    }
  }
}
