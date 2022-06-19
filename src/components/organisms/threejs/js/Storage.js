function Storage() {
  var indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;

  if (indexedDB === undefined) {
    console.warn('Storage: IndexedDB not available.');
    return {
      //eslint error cannot use empty functions
      init: function () {
        let a = false;
        if (a) {
          console.warn('');
        }
      },
      get: function () {
        let a = false;
        if (a) {
          console.warn('');
        }
      },
      set: function () {
        let a = false;
        if (a) {
          console.warn('');
        }
      },
      clear: function () {
        let a = false;
        if (a) {
          console.warn('');
        }
      },
    };
  }

  var name = 'threejs-editor';
  var version = 1;

  var database;

  return {
    init: function (callback) {
      var request = indexedDB.open(name, version);
      request.onupgradeneeded = function (event) {
        var db = event.target.result;

        if (db.objectStoreNames.contains('states') === false) {
          db.createObjectStore('states');
        }
      };

      request.onsuccess = function (event) {
        database = event.target.result;

        callback();
      };

      request.onerror = function (event) {
        console.error('IndexedDB', event);
      };
    },

    get: function (editorFile, callback) {
      var transaction = database.transaction(['states'], 'readwrite');
      var objectStore = transaction.objectStore('states');
      var request = objectStore.get(editorFile);
      request.onsuccess = function (event) {
        callback(event.target.result);
      };
    },

    set: function (editorFile, data) {
      // var start = performance.now();
      var transaction = database.transaction(['states'], 'readwrite');
      var objectStore = transaction.objectStore('states');
      objectStore.put(data, editorFile);

      // var request = objectStore.put(data, editorFile);
      // request.onsuccess = function () {
      // console.warn(
      //   '[' + /\d\d:\d\d:\d\d/.exec(new Date())[0] + ']',
      //   'Saved state to IndexedDB. ' +
      //     (performance.now() - start).toFixed(2) +
      //     'ms'
      // );
      // };
    },

    clear: function (editorFile, all) {
      if (database === undefined) return;

      var transaction = database.transaction(['states'], 'readwrite');
      var objectStore = transaction.objectStore('states');

      if (!all) {
        objectStore.delete(editorFile);
      } else {
        objectStore.clear();
      }

      //  var request = objectStore.delete(editorFile);
      // request.onsuccess = function () {
      //   console.warn(
      //     '[' + /\d\d:\d\d:\d\d/.exec(new Date())[0] + ']',
      //     'Cleared IndexedDB.'
      //   );
      // };
    },
  };
}

export { Storage };
