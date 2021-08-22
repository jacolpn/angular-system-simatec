import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { InsertPlanning } from "./insert-planning.model";

@Injectable()
export class InsertPlanningService {
    constructor(private http: HttpClient) { }

    postPlanning(insertPlanning: InsertPlanning): Observable<string> {
        return this.http.post<any>(`${environment.api}/compliments`, insertPlanning);
    }
}