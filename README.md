# CSE 134B Homework 5

## Links
- Live site: https://capable-brigadeiros-a25c31.netlify.app/
- Repo: https://github.com/khanggn/cse134b-hw5
- Web component: https://capable-brigadeiros-a25c31.netlify.app/experiments.html

## ssg exercise
I used astro and of the content is in the `ssg-exercise/` folder. I rebuilt my homepage and the about page since they both use the same footer from `src/components/Footer.astro`. The commands to install/build/preview are in the README inside that folder.

## design note for the web component `<cat-facts>`

**what it's for:** the user just wants to read a cat fact and get a new one whenever they want without the page reloading.

**the process when the user clicks "Tell me something about cats":**
1. The button has a click listener that calls `loadFact()`
2. First it sets the button to `aria-disabled="true"` so users can't spam requests. the status line changes to "Loading a cat fact…". I also used aria disabled instead of `disabled` because a disabled button kicks keyboard focus back to the top of the page.
3. Then it does `fetch("https://catfact.ninja/fact")`. If `response.ok` is false it throws an error.
4. It parses the JSON and checks that `fact` is actually a string and isn't empty. If `length` isn't a number it just counts the characters itself.
5. If everything is correct, the fact goes on the page with `textContent`. the details line updates, and the status says "Fact N loaded."
6. `finally` turns the button back on no matter if it worked or not.

**What you see:**
- loading: the button dims and the status says it's loading
- success: new fact shows up and the status line updates
- failure: the old fact stays, the status turns red and says it couldn't load, and the button changes to "Try again"

**Compact:** the "Compact view" button is outside the component and just toggles the `compact` attribute on `<cat-facts>`. the component watches that attribute and hides/shows the details line. your choice gets saved in localStorage so it stays after a reload

**No JavaScript:** the widget just says "Enable JavaScript to load live data for this widget" and the rest of the site still works fine.