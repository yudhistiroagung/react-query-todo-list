export class Storage {

    ['_collections'] = [];

    constructor(identifierFn) {
        this.identifierFn = identifierFn;
    }

    async add(item) {
        const [existingItem, index] = await this.findItem(item);
        if (existingItem) {
            this._collections[index] = item;
            return;
        }

        this._collections.push(item);
    }

    async delete(item) {
        const [index, existingItem] = await this.findItem(item);
        if (!existingItem) {
            throw new Error('Cannot remove item from storage');
        }

        this._collections.splice(index, 1);
    }

    async getAll() {
        return this._collections;
    }

    async getById(id) {
        const item = this.findById(id);
        if (!item)
            throw new Error('Item with id ' + id + ' does not exist');

        return item;
    }

    ['findItem'] = async (item) => {
        const id = this.identifierFn(item);
        const index = this._collections.findIndex((data) => this.identifierFn(data) === id);
        return index > -1 ? [this._collections[index], index] : [undefined, index];
    }

    ['findById'] = async (id) => {
        return this._collections.findIndex((data) => this.identifierFn(data) === id);
    }
}