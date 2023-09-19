# i-just-want-to-see-the-plist

micro project to easily convert [.plist files](https://en.wikipedia.org/wiki/Property_list) into json objects

## but why

- some .plist files are xml, but kinda annoying and verbose. that's kinda fine.
- some .plist files are binary, which is not fun because you can't see inside of them
- you could [run](https://stackoverflow.com/a/10991695) `plutil -convert json Data.plist` but then that will [overwrite](https://stackoverflow.com/questions/6066350/command-line-tool-for-converting-plist-to-json#comment20774567_10991695) the original (??) so then you need to run `plutil -convert json -o Data.json Data.plist` and I'm not going to [remember](https://xkcd.com/1168/) that.
- I think it's completely reasonable to make tools for yourself that may be useful in the future, and also for these tools to maybe useful for others. it's not the tool, it's the journey?? but it's also the tool.
- also I would noooooot want a tool to get my .plist files on their server and convert them there..?!?! so yeah, this is all-browser-based-only. browsers are great

## install

```bash
npm install # npm i
npm run dev
```

## build it

`npm run build`

this tool is deployed to github pages

## huh

this was done on day 1 of my residency at [Recurse Center](https://www.recurse.com/)
