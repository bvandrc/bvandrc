const HOBBIES = [
  '🎧 DJing 🎧',
  '🚴 Bike Riding to explore Denver 🚴',
  '⛷️ Hitting the slopes with friends ⛷️',
  '✈️ Exploring my neighborhood, Colorado, and the world! ✈️',
  '🎬 Checking out good movies 🎬',
  '🎵 Catching live music 🎵',
]

export const BeyondCode = () => (
  <>
    <p>When I'm not coding, you'll find me:</p>
    <p>
      {HOBBIES.map((hobby, i) => (
        <>
          {i > 0 && <br />}
          {hobby}
        </>
      ))}
    </p>
  </>
)
