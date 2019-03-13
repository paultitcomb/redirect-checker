# Redirect checker

This is a simple package for curling a list of urls and recording the redirect jumps that the url makes. It produces a json file at the end that shows all the data it has collected about the redirect journey.

## Installing this repository

In your command line, type the following where you want the redirect checker to be installed

```
git clone
```

Make sure you have Nodejs installed on your machine, cd into the folder where you cloned this git repo from. If you do have node installed you can go ahead and run:

```
npm install
```

## Running the checker

When all the node packages have been installed, in your command line run:

```
node check http://www.url.com
```

Replacing the example domain with the one you want to crawl. Once that has run it'll spit out a redirects.json file with all the data in it.
