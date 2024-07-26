import Header from "../components/Header";

export default class GaragePage {
    constructor ( page ) {
        this._page = page;
        this._url = '/panel/garage';
        this.myProfileIcon = page.locator( '#userNavDropdown' );
        this._waitPageSelector = '#userNavDropdown';
        this._header = new Header( page );
    }


}