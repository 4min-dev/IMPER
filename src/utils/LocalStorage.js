export default
class LocalStorage
{

    save(key, value) {
        let _value = JSON.stringify(value);

        localStorage.setItem(key, _value);

        return true;
    }

    get(key) {
        let data = localStorage.getItem(key);

        if(data === null)
            return false;

        let _data = null;

        try {
            _data = JSON.parse(data);
        } catch (e) {
            console.error(e);
        }

        return _data;
    }

    remove(key) {
        localStorage.removeItem(key);
    }

    rowsCount() {
        return localStorage.length;
    }

    deleteAll() {
        localStorage.clear();
    }

}
