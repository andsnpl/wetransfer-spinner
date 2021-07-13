# wetransfer-spinner

## Requirements

- The spinner starts with a small blue arc at the 90% position. The arc appears to travel around a light gray circular "track" at a moderate pace (about once every 2-3 seconds).
- As the percent completion of the upload approaches 100%, the size of the blue arc will grow to cover 100% of the circle.
- The spinner has a large textual readout in the center that starts at "0%" and increases to "100%". The readout doesn't show decimal places.
- In this demo configuration, the user can start, stop (pause) and reset the spinner, and can arbitrarily increase or decrease the completion percent.

## Approach

I built a non-rotating version of the graphic to handle rendering an arc of a given percentage size. This `CircularGauge` can be a reusable component on its own. The graphic was built mainly from four square-shaped gray `div`s styled with CSS to cover the four quadrants of the circle. As the size of the filled arc increases, the squares rotate out of the way, revealing the blue fill color underneath them. There is a fifth square, in blue, covering the 0-90% quadrant that only appears once the first background block has completely rotated out. Because it sits on top of the other blocks, this allows all of the gray blocks to continue rotating beyond 270% without starting to re-cover the first quadrent.

When using animation, I always default to basing animations in CSS unless there is a requirement to do otherwise. (The spring-based motion that is currently popular is one example of where I would do otherwise.) It is usually simpler, more maintainable, and more amenable to optimization and hardware acceleration by the browser. The transition of the blue arc from 0 to 100% is done declaratively in CSS.

The `Spinner` is built using the same `CircularGauge` and giving it a rotation, again with CSS for the same reasons.

Instead of allowing the Spinner to pass a prop that rotated only the track portion of the `CircularGauge`, I took the decision that the way to extend `CircularGauge` into a `Spinner` was to allow the user to specify custom `children`. The `Spinner` uses this to effect two customizations: (1) it counter-rotates the readout to balance the rotation of the whole component, and (2) it displays "0%" in the readout when that is appropriate, even though the gauge shows a small arc. This makes the `CircularGauge` more flexible in supporting future evolution, as opposed special-purpose props which would bloat the interface.

## Testing

The `Spinner` and `CircularGauge` components are purely visual decoration around a simple text readout, so the typical validation done in testing simply doesn't apply. Validating that `value={100}` results in a readout of `"100%"`, for example, is trivial and not worth adding to a test suite if we can help it.

However, the possible space for visual regressions as we evolve the component is quite large, and we want to prevent unintentional regressions to the best of our ability; so I used snapshots to cover the major states that each component can be in. I think this is the right approach, but it is imperfect in that it can't (easily) test the CSS applied via stylesheet; and it is prone to fail for non-breaking changes, leading to developer complacency when over-used.
