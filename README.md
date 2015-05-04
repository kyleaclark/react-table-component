#react-table-component

### Setup

Setup instructions default to Mac OS X environment, but setup is possible in Windows and Linux, too.

**Requires Node** Node compatible version >= 0.10.2 < 0.11.0

#### Install Gulp

```
npm install -g gulp
```

#### Install Node Packages

```
npm install
```

If issues installing node packages, try the solution below before running again.

```
rm -rf node_modules
sudo npm cache clean
sudo npm install
```

### Development

```
gulp serve
```

### Production

```
gulp dist
```
