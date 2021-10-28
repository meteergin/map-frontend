export class SearchResult {

  constructor(
    public nearbyLatitude:number,
    public nearbyLongitude:number,
    public searchedLatitude:number,
    public searchedLongitude:number,
    public radius:number,
    public name:string,
  ) {  }

}
