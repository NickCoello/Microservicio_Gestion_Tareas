import { TestBed } from '@angular/core/testing';

import { TareaService } from './tarea.service';

describe('Tarea', () => {
  let service: TareaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
