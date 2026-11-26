interface Props {
  name: string;
  tags: string[];
}

// Given: smaller projects with nothing honest to illustrate.
// Approach: no mock visuals; just the name and stack, centred on the dot grid.
export default function TextPreview({ name, tags }: Props) {
  return (
    <div class="textprev">
      <p class="textprev__name" aria-hidden="true">
        {name}
      </p>
      <ul class="textprev__tags" aria-hidden="true">
        {tags.map((t) => (
          <li key={t} class="chip">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
