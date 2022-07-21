type IHateoas = {
  previus?: string;
  next?: string;
  init?: string;
  fin?: string;
};

export class Hateoas {
  _take!: number;
  _skip!: number;
  _hateoas!: IHateoas;
  constructor({
    limit,
    offset,
  }: {
    limit: string | undefined;
    offset: string | undefined;
  }) {
    this._take = limit ? (+limit > 0 ? 
      (+limit <= 100 ? +limit : 100) : 0) : 0;
    this._skip = offset ? +offset : 0;
  }

  public get take(): number {
    return this._take;
  }

  public get skip(): number {
    return this._skip;
  }

  public hateoas({ count }: { count: number }): [IHateoas, number] {
    this._hateoas = {};
    const divide = count / this._take;
    const min = parseInt(`${divide}`);
    const pages = divide > min ? min + 1 : min;

    this._hateoas.previus = `offset=${this._skip - 1}`;
    this._hateoas.next = `offset=${this._skip + 1}`;
    this._hateoas.init = 'offset=0';
    this._skip + 1 >= pages && delete this._hateoas.next;

    this._hateoas.fin = `offset=${pages - 1 < 0 ? 0 : pages - 1}`;

    if (this._skip === 0) delete this._hateoas.previus;
    if (this._skip >= pages) {
      delete this._hateoas.next;
      if (this._skip > pages)
        this._hateoas.previus = `offset=${parseInt(`${count / this._take}`)}`;
    }

    return [this._hateoas, pages];
  }
}

