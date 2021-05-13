import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  availableExercise: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, caloriesBurnt: 80 },
    { id: 'touchToes', name: 'Touch Toes', duration: 180, caloriesBurnt: 100 },
    { id: 'sideLunges', name: 'Side Lunges', duration: 120, caloriesBurnt: 170 },
    { id: 'burpees', name: 'Burpees', duration: 60, caloriesBurnt: 60 },
  ];
  private runningExercise: Exercise;
  exerciseChanged = new Subject<Exercise>();
  exercise: Exercise[] = [];

  constructor() { }

  getAvailableExercices() {
    return this.availableExercise.slice();
  }

  startExercise(selectedId: string) {
    const selectedExercise = this.availableExercise.find((x) => x.id === selectedId);
    this.runningExercise = selectedExercise;
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.exercise.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercise.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      caloriesBurnt: this.runningExercise.caloriesBurnt * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  getCompletedOrCancelledExercises() {
    return this.exercise.slice();
  }
}
