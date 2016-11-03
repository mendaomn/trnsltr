class AppController {
  get _dict() {
    if ( this._isInputItalian )
      return {
        a: 'auf',
        e: 'egle',
        i: 'ichi',
        o: 'oncle',
        u: 'ube'
      };
    else
      return {
        auf: 'a',
        egle: 'e',
        ichi: 'i',
        oncle: 'o',
        ube: 'u'
      };
  }

  constructor() {
    // default config
    this._isInputItalian = true;

    // autobind handlers
    this._onSubmit = this._onSubmit.bind( this );
    this._onToggle = this._onToggle.bind( this );

    // set up listeners
    this._dom();
    this._listeners();
  }

  _dom() {
    this._form = document.querySelector( '.js-form' );
    this._labelFrom = document.querySelector( '.js-label-from' );
    this._labelTo = document.querySelector( '.js-label-to' );
    this._input = document.querySelector( '.js-text-input' );
    this._toggle = document.querySelector( '.js-toggle-btn' );
    this._output = document.querySelector( '.js-output-p' );
  }

  _listeners() {
    this._toggle.addEventListener( 'click', this._onToggle )
    this._form.addEventListener( 'submit', this._onSubmit )
  }

  _onSubmit( evt ) {
    evt.preventDefault();

    this._output.textContent = this._translate( this._input.value );
    this._input.blur();
    this._output.classList.add( 'visible' );
  }

  _onToggle( evt ) {
    this._isInputItalian = !this._isInputItalian;

    this._toggle.classList.toggle( 'reverse' );

    this._labelFrom.textContent = this._isInputItalian ? "Italiano" : "Spraunf";
    this._labelTo.textContent = this._isInputItalian ? "Spraunf" : "Italiano";
  }

  _translate( text ) {
    return ( this._isInputItalian ) ?
      this._fromItalian( text ) :
      this._toItalian( text );
  }

  _fromItalian( text ) {
    var letters = text.split( '' );

    return letters.map( letter => this._dictionaryLookup( letter ) )
      .join( '' );
  }

  _toItalian( text ) {
    var tokens = Object.keys( this._dict );

    return tokens.reduce(
      ( output, token ) => output.replace(
        new RegExp( token, "g" ),
        this._dict[ token ]
      ),
      text
    )
  }

  _dictionaryLookup( letter ) {
    return this._dict[ letter ] || letter;
  }
}

// create the app controller
new AppController();