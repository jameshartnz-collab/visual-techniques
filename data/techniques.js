/* =============================================================================
   VISUAL TECHNIQUES — DATA
   -----------------------------------------------------------------------------
   This is the heart of the site. Everything you see is generated from the
   three lists below. To add or change content, edit this file only.

   EFFECTS      — the moods / impacts a student might want to create.
   TECHNIQUES   — the visual techniques, each tagged with the effects it serves.
   COMBINATIONS — prebuilt "visual recipes" that bundle techniques together.

   HOW TO ADD A NEW TECHNIQUE
   --------------------------
   Copy one technique object, paste it into the TECHNIQUES array, and edit:
     id          unique slug, lowercase-with-dashes (also used for the image path)
     name        display name
     category    one of the CATEGORY ids below
     difficulty  "easy" | "moderate" | "advanced"
     blurb       plain-English explanation (what it is)
     creates     the effect / meaning it can create for an audience
     useInMV     how a student could use it in their own music video
     example     a concrete shot or editing example
     mistakes    common mistakes or overused choices to avoid
     related     array of other technique ids
     effects     array of EFFECT ids this technique helps achieve
     queries     search terms for finding clean, legal reference examples
   The image is found automatically at:  assets/examples/<id>.jpg
   ============================================================================= */

const CATEGORIES = [
  { id: "camera",       label: "Camera",        note: "Shots, angles and movement" },
  { id: "editing",      label: "Editing",       note: "How shots are cut together" },
  { id: "lighting",     label: "Lighting",      note: "Light, shadow and exposure" },
  { id: "colour",       label: "Colour",        note: "Palette and grading" },
  { id: "mise-en-scene",label: "Mise-en-scène", note: "Framing, setting and staging" },
  { id: "performance",  label: "Performance",   note: "What performers do on camera" },
  { id: "symbolism",    label: "Symbolism",     note: "Images that carry meaning" },
  { id: "sound-image",  label: "Sound & Image", note: "How visuals meet the track" }
];

const DIFFICULTIES = [
  { id: "easy",     label: "Easy",     note: "Achievable with a phone and a little planning" },
  { id: "moderate", label: "Moderate", note: "Needs setup, rehearsal or careful editing" },
  { id: "advanced", label: "Advanced", note: "Demands skill, kit or post-production time" }
];

const EFFECTS = [
  { id: "tension",       label: "Create tension",            tagline: "Keep the audience on edge",                 hint: "Build suspense, pressure or the sense that something is about to happen." },
  { id: "isolation",     label: "Show isolation",            tagline: "A figure alone in the world",               hint: "Make a character feel separate, lonely or cut off from others." },
  { id: "power",         label: "Make someone powerful",     tagline: "Command the frame",                         hint: "Make a character or figure seem dominant, heroic or intimidating." },
  { id: "intimacy",      label: "Create intimacy",           tagline: "Close and personal",                        hint: "Pull the audience emotionally close to a character." },
  { id: "confusion",     label: "Show confusion",            tagline: "Disorient the viewer",                      hint: "Make a moment feel disorienting, unstable or hard to read." },
  { id: "nostalgia",     label: "Suggest nostalgia",         tagline: "A memory, softened by time",                hint: "Make something feel like a memory, a faded past or a longing for it." },
  { id: "dreamlike",     label: "Feel dreamlike",            tagline: "Float free of reality",                     hint: "Make a scene feel like a dream — soft, strange and unreal." },
  { id: "vulnerability", label: "Make someone vulnerable",   tagline: "Small, exposed, fragile",                   hint: "Make a character seem fragile, exposed or powerless." },
  { id: "energy",        label: "Build energy",              tagline: "Drive the pace",                            hint: "Raise the pace, excitement and momentum of the video." },
  { id: "status",        label: "Show status or dominance",  tagline: "Who is in control",                         hint: "Show rank, control or dominance between people." },
  { id: "unease",        label: "Create unease",             tagline: "Something feels wrong",                     hint: "Make the audience feel that something is subtly wrong." },
  { id: "freedom",       label: "Suggest freedom",           tagline: "Open space, open feeling",                  hint: "Create a sense of release, openness or escape." },
  { id: "artificial",    label: "Feel artificial",           tagline: "Built, staged, unreal",                     hint: "Make a scene feel constructed, staged or deliberately fake." },
  { id: "emotion",       label: "Emphasise emotion",         tagline: "Hold a feeling in focus",                   hint: "Heighten and draw attention to a character's feeling." },
  { id: "conflict",      label: "Show conflict",             tagline: "Two forces collide",                        hint: "Set two people, ideas or worlds against each other." },
  { id: "realism",       label: "Create realism",            tagline: "Honest and unstaged",                       hint: "Make the video feel real, raw and believable." },
  { id: "surreal",       label: "Be surreal or symbolic",    tagline: "Meaning over reality",                      hint: "Use strange or symbolic images to express ideas, not events." }
];

/* ----------------------------------------------------------------------------
   TECHNIQUES
   ---------------------------------------------------------------------------- */

const TECHNIQUES = [
  /* ---------------------------- CAMERA ----------------------------------- */
  {
    id: "low-angle-shot",
    name: "Low-Angle Shot",
    category: "camera",
    difficulty: "easy",
    blurb: "The camera looks up at a subject from below eye level.",
    creates: "Makes a character, object or figure seem powerful, dominant, heroic or intimidating, because the audience is forced to look up at them.",
    useInMV: "Shoot the artist from below during a confident or commanding moment in the track so they appear to tower over the viewer and the world around them.",
    example: "A low-angle shot of the artist standing still as a crowd moves past below frame, the sky behind their head.",
    mistakes: "Overusing it for every shot flattens its impact. A very extreme low angle can look comic rather than powerful if it doesn't match the music.",
    related: ["high-angle-shot", "centred-framing", "backlighting"],
    effects: ["power", "status"],
    queries: ["low angle shot example", "low angle hero shot cinematography", "looking up at character film still"]
  },
  {
    id: "high-angle-shot",
    name: "High-Angle Shot",
    category: "camera",
    difficulty: "easy",
    blurb: "The camera looks down on a subject from above eye level.",
    creates: "Makes a character appear vulnerable, small, trapped, judged or powerless, because the audience looks down on them.",
    useInMV: "Film the artist from above during a moment of doubt, loneliness or defeat in the lyrics so they seem diminished by the space around them.",
    example: "A high-angle shot of a lone figure sitting on the floor of a large empty room.",
    mistakes: "Don't confuse a gentle high angle with a true bird's-eye view. A slight tilt down is subtle; aim too high and the meaning changes.",
    related: ["low-angle-shot", "negative-space", "birds-eye-view"],
    effects: ["vulnerability", "isolation"],
    queries: ["high angle shot example", "looking down at character cinematography", "vulnerable high angle film still"]
  },
  {
    id: "close-up",
    name: "Close-Up",
    category: "camera",
    difficulty: "easy",
    blurb: "A shot that fills the frame with a character's face.",
    creates: "Forces the audience to focus on a single emotion — fear, grief, confidence, anger — and builds intimacy and identification.",
    useInMV: "Cut to a close-up on the artist's face on an emotional lyric so the audience reads exactly what the line means to them.",
    example: "A close-up holds on the singer's face as a tear forms, timed to the most personal line of the chorus.",
    mistakes: "Holding a close-up too long with no change drains its power. Avoid using it for lines that aren't emotionally important.",
    related: ["extreme-close-up", "shallow-depth-of-field", "direct-address"],
    effects: ["emotion", "intimacy"],
    queries: ["close up face emotion film", "music video close up shot", "emotional close up cinematography"]
  },
  {
    id: "extreme-close-up",
    name: "Extreme Close-Up",
    category: "camera",
    difficulty: "moderate",
    blurb: "A shot of a tiny detail — an eye, a hand, a tear, a phone screen, a symbolic object.",
    creates: "Magnifies a single detail until it feels overwhelming or charged with meaning, creating tension, unease or intense emotional focus.",
    useInMV: "Cut to an extreme close-up of a shaking hand or a phone notification to load a small object with emotional weight.",
    example: "An extreme close-up of an eye flicking sideways, the only sign of fear in an otherwise still face.",
    mistakes: "Without context the audience can't tell what they're looking at. Establish the wider shot first, or the detail reads as random.",
    related: ["close-up", "symbolic-props", "shallow-depth-of-field"],
    effects: ["tension", "emotion", "unease"],
    queries: ["extreme close up eye film", "macro detail shot music video", "extreme close up object symbolism"]
  },
  {
    id: "wide-shot",
    name: "Wide Shot",
    category: "camera",
    difficulty: "easy",
    blurb: "A shot that shows the full figure within a large setting.",
    creates: "Places a character inside their environment to suggest isolation, smallness, freedom or vulnerability depending on the space.",
    useInMV: "Frame the artist as a small figure in a vast landscape or empty city to make them feel alone or set free, depending on the mood.",
    example: "A wide shot of a single figure standing at the end of a long empty road that stretches to the horizon.",
    mistakes: "If the background is cluttered or meaningless the shot says nothing. The setting must carry the meaning.",
    related: ["negative-space", "birds-eye-view", "location-contrast"],
    effects: ["isolation", "freedom", "vulnerability"],
    queries: ["wide shot lone figure landscape", "extreme long shot isolation film", "music video wide establishing shot"]
  },
  {
    id: "tracking-shot",
    name: "Tracking Shot",
    category: "camera",
    difficulty: "moderate",
    blurb: "The camera physically moves to follow a subject through a space.",
    creates: "Pulls the audience along on a character's journey, building momentum, immersion and a sense of the world unfolding around them.",
    useInMV: "Track alongside or behind the artist as they walk through a setting during a building section of the track to drive energy and movement.",
    example: "A tracking shot following the artist from behind as they walk through a crowded corridor that parts around them.",
    mistakes: "Wobbly, aimless tracking looks like a mistake. Plan the path, keep the subject framed, and use a gimbal or smooth surface.",
    related: ["handheld-camera", "steadicam", "choreographed-movement"],
    effects: ["energy", "realism", "freedom"],
    queries: ["tracking shot music video", "following shot gimbal cinematography", "walk and talk tracking shot"]
  },
  {
    id: "handheld-camera",
    name: "Handheld Camera",
    category: "camera",
    difficulty: "easy",
    blurb: "The camera is held by hand, so the image shakes and breathes.",
    creates: "Creates realism, urgency, panic or raw intimacy, as if the audience is physically present in the moment.",
    useInMV: "Switch to handheld during a chaotic or emotional section so the instability of the image mirrors the character's state of mind.",
    example: "A handheld close-up that drifts and jolts as the artist moves through a crowd, never quite settling.",
    mistakes: "Too much shake becomes nauseating and reads as careless. Use it deliberately, not as a substitute for a tripod.",
    related: ["tracking-shot", "documentary-realism", "fast-cutting"],
    effects: ["realism", "tension", "unease"],
    queries: ["handheld camera music video", "shaky cam realism film", "handheld documentary style shot"]
  },
  {
    id: "slow-zoom",
    name: "Slow Zoom / Push-In",
    category: "camera",
    difficulty: "moderate",
    blurb: "The camera slowly moves or zooms closer to a subject.",
    creates: "Builds quiet intensity, dawning realisation or emotional focus as the audience is drawn steadily toward the subject.",
    useInMV: "Push in slowly on the artist's face across a verse so that by the chorus the audience feels locked into their emotion.",
    example: "A slow push-in on a still face over eight bars, ending in a close-up just as the beat drops.",
    mistakes: "Too fast and it becomes a crash zoom; too obvious and it feels gimmicky. The movement should be almost unnoticeable.",
    related: ["crash-zoom", "close-up", "slow-motion"],
    effects: ["tension", "emotion"],
    queries: ["slow push in shot film", "slow zoom cinematography", "creeping zoom tension scene"]
  },
  {
    id: "whip-pan",
    name: "Whip Pan",
    category: "camera",
    difficulty: "moderate",
    blurb: "The camera swings sideways so fast the image blurs.",
    creates: "Injects sudden energy and can disorient the viewer or hide a cut between two shots or locations.",
    useInMV: "Use a whip pan on a beat to snap between two performance setups, keeping the pace relentless and the editing invisible.",
    example: "A whip pan left blurs the frame, landing on the artist in a completely new outfit and location on the next beat.",
    mistakes: "Using it constantly makes the video exhausting and confusing. Save it for transitions that need a jolt.",
    related: ["crash-zoom", "fast-cutting", "spinning-camera"],
    effects: ["energy", "confusion"],
    queries: ["whip pan transition music video", "swish pan cinematography", "fast pan blur transition"]
  },
  {
    id: "crash-zoom",
    name: "Crash Zoom",
    category: "camera",
    difficulty: "moderate",
    blurb: "A very fast zoom that snaps in (or out) on a subject.",
    creates: "Delivers a punch of energy, shock or emphasis, slamming the audience's attention onto a detail.",
    useInMV: "Crash zoom onto the artist's face exactly on a beat drop to make the moment hit harder.",
    example: "A crash zoom snaps from a wide shot to a tight close-up on the eyes as the bass kicks in.",
    mistakes: "Overuse turns drama into comedy. One or two well-placed crash zooms land; ten feel like a parody.",
    related: ["slow-zoom", "whip-pan", "fast-cutting"],
    effects: ["energy", "tension"],
    queries: ["crash zoom example", "fast zoom in shot film", "snap zoom music video"]
  },
  {
    id: "dutch-angle",
    name: "Dutch Angle",
    category: "camera",
    difficulty: "easy",
    blurb: "The camera is tilted so the horizon sits on a slant.",
    creates: "Suggests instability, unease, danger or psychological imbalance, because the world literally looks off-balance.",
    useInMV: "Tilt the frame during a disorienting or threatening section so the audience feels that something is wrong before they can say why.",
    example: "A Dutch angle on the artist standing in a neon-lit alley, the tilted frame making the space feel hostile.",
    mistakes: "A tiny tilt looks like an accident; commit to the angle. Using it everywhere numbs the audience to its meaning.",
    related: ["handheld-camera", "low-key-lighting", "spinning-camera"],
    effects: ["unease", "confusion", "tension"],
    queries: ["dutch angle shot example", "tilted camera unease film", "canted angle cinematography"]
  },
  {
    id: "pov-shot",
    name: "Point-of-View (POV) Shot",
    category: "camera",
    difficulty: "moderate",
    blurb: "The camera shows exactly what a character sees.",
    creates: "Forces the audience to experience the scene through one person's eyes, building intimacy, anxiety or identification.",
    useInMV: "Film a POV shot of hands reaching out or a crowd closing in so the audience feels they are inside the character's experience.",
    example: "A POV shot of a phone screen lighting up in the dark, the character's thumb hovering over a message.",
    mistakes: "POV only works if the audience knows whose eyes they're borrowing. Cut to the character first, then the POV.",
    related: ["over-the-shoulder-shot", "handheld-camera", "extreme-close-up"],
    effects: ["intimacy", "tension", "confusion"],
    queries: ["point of view shot music video", "POV cinematography example", "first person shot film"]
  },
  {
    id: "over-the-shoulder-shot",
    name: "Over-the-Shoulder Shot",
    category: "camera",
    difficulty: "easy",
    blurb: "The camera shoots past one person's shoulder toward another person or object.",
    creates: "Places the audience inside a relationship or confrontation, and can suggest watching, conflict or connection.",
    useInMV: "Shoot over the artist's shoulder toward a mirror or another character to stage a moment of confrontation or self-reflection.",
    example: "An over-the-shoulder shot past the artist toward their own reflection, framing a quiet face-off with themselves.",
    mistakes: "If the foreground shoulder dominates the frame, the real subject gets lost. Keep the focus on what matters.",
    related: ["pov-shot", "mirrors-reflections", "framing-within-frames"],
    effects: ["conflict", "intimacy"],
    queries: ["over the shoulder shot example", "OTS shot cinematography", "confrontation two shot film"]
  },
  {
    id: "shallow-depth-of-field",
    name: "Shallow Depth of Field",
    category: "camera",
    difficulty: "moderate",
    blurb: "Only the subject is in sharp focus; the background melts into a blur.",
    creates: "Isolates a character from their surroundings and creates intimacy, beauty or emotional focus.",
    useInMV: "Keep the artist sharp while the background dissolves into soft lights so the audience can only look at them.",
    example: "A shallow-focus close-up of the artist as distant streetlights blur into glowing circles behind them.",
    mistakes: "If focus drifts off the subject the shot is ruined. It also flattens a sense of place — don't use it when the setting matters.",
    related: ["deep-focus", "close-up", "neon-lighting"],
    effects: ["intimacy", "emotion", "dreamlike"],
    queries: ["shallow depth of field portrait", "bokeh background music video", "shallow focus close up film"]
  },
  {
    id: "deep-focus",
    name: "Deep Focus",
    category: "camera",
    difficulty: "advanced",
    blurb: "Everything from foreground to background stays in sharp focus.",
    creates: "Lets the audience read the whole frame at once and can stage power, distance or conflict between near and far elements.",
    useInMV: "Keep both the artist in the foreground and a figure far behind in focus so the audience sees the relationship between them.",
    example: "A deep-focus shot with the artist large in the foreground and a tiny, sharp figure watching from the far background.",
    mistakes: "Deep focus needs lots of light and a wide setting; a cramped, dim scene won't hold it. Don't fill every layer with clutter.",
    related: ["shallow-depth-of-field", "foreground-background-contrast", "wide-shot"],
    effects: ["realism", "conflict"],
    queries: ["deep focus cinematography example", "everything in focus shot film", "deep focus staging foreground background"]
  },
  {
    id: "birds-eye-view",
    name: "Bird's-Eye / Overhead Shot",
    category: "camera",
    difficulty: "moderate",
    blurb: "The camera looks straight down from directly above.",
    creates: "Turns people into patterns and can suggest a character is part of a system, a maze or a larger force beyond their control.",
    useInMV: "Shoot the artist lying on the floor or moving through a crowd from directly overhead to make them feel small within a pattern.",
    example: "A bird's-eye shot of the artist lying in the centre of a circular pattern of objects, dwarfed by the design.",
    mistakes: "Hard to capture without height or a drone. A near-overhead angle is not the same and can look like a mistake.",
    related: ["high-angle-shot", "centred-framing", "negative-space"],
    effects: ["isolation", "artificial", "status"],
    queries: ["birds eye view shot music video", "overhead top down shot film", "drone directly overhead pattern"]
  },
  {
    id: "spinning-camera",
    name: "Spinning Camera",
    category: "camera",
    difficulty: "advanced",
    blurb: "The camera rotates around or with a subject.",
    creates: "Suggests confusion, intoxication, obsession, emotional collapse or being trapped in a cycle.",
    useInMV: "Spin the camera around the artist during a chorus about losing control so the world appears to whirl around them.",
    example: "The camera circles a still artist faster and faster as the music builds, the background smearing into motion.",
    mistakes: "Too much spinning is genuinely disorienting and can feel like a gimmick. Tie it to a clear emotional reason.",
    related: ["dutch-angle", "handheld-camera", "fast-cutting"],
    effects: ["confusion", "unease", "energy"],
    queries: ["camera spin around subject music video", "rotating camera shot film", "orbit shot cinematography"]
  },
  {
    id: "soft-focus",
    name: "Soft Focus",
    category: "camera",
    difficulty: "moderate",
    blurb: "The image is gently softened, taking the hard edge off detail.",
    creates: "Creates a romantic, nostalgic or dreamlike mood, as if the moment is being remembered rather than lived.",
    useInMV: "Use soft focus for memory or flashback sections so they feel separate from the sharper, present-day shots.",
    example: "A soft-focus shot of two figures laughing in golden light, the haze making it feel like a treasured memory.",
    mistakes: "Don't confuse soft focus with a shot that's simply out of focus. Keep it intentional and consistent within a section.",
    related: ["shallow-depth-of-field", "warm-colour-palette", "slow-motion"],
    effects: ["nostalgia", "dreamlike", "intimacy"],
    queries: ["soft focus dreamy shot film", "diffusion filter cinematography", "nostalgic soft focus music video"]
  },
  {
    id: "steadicam",
    name: "Steadicam / Gimbal Movement",
    category: "camera",
    difficulty: "advanced",
    blurb: "The camera glides through space with unnaturally smooth motion.",
    creates: "Creates control, calm, confidence or a dreamlike, floating quality as the audience drifts weightlessly through the scene.",
    useInMV: "Float smoothly through a space alongside the artist to make a performance feel polished, controlled and stylised.",
    example: "A gimbal shot drifts smoothly down a corridor and around the artist without a single bump.",
    mistakes: "Perfectly smooth movement can feel cold or sterile if the song is raw or emotional. Match the motion to the mood.",
    related: ["tracking-shot", "choreographed-movement", "deep-focus"],
    effects: ["dreamlike", "status", "energy"],
    queries: ["gimbal smooth shot music video", "steadicam long take film", "floating camera movement cinematography"]
  },

  /* ---------------------------- EDITING ---------------------------------- */
  {
    id: "slow-motion",
    name: "Slow Motion",
    category: "editing",
    difficulty: "easy",
    blurb: "Footage is slowed so a moment stretches out in time.",
    creates: "Makes a moment feel important, beautiful, painful or significant, forcing the audience to dwell on it.",
    useInMV: "Slow down a key gesture — a turn, a fall, a look — so the audience feels its emotional weight.",
    example: "Slow motion of the artist turning toward camera as their hair and coat lift, holding the beat for emphasis.",
    mistakes: "Slowing everything kills the contrast that makes slow motion special. Footage must be filmed at a high frame rate or it looks juddery.",
    related: ["freeze-frame", "soft-focus", "slow-zoom"],
    effects: ["emotion", "dreamlike", "nostalgia"],
    queries: ["slow motion music video", "slow mo high frame rate shot", "slow motion emotional moment film"]
  },
  {
    id: "fast-cutting",
    name: "Fast Cutting",
    category: "editing",
    difficulty: "easy",
    blurb: "Many short shots cut together in quick succession.",
    creates: "Generates energy, excitement, stress or chaos, and is often cut to the beat of the track.",
    useInMV: "Cut rapidly on the beat during a high-energy chorus so the editing rhythm matches the music's drive.",
    example: "A burst of ten shots in four seconds, each landing exactly on a drum hit during the drop.",
    mistakes: "Cutting fast with no rhythm just feels messy. Lock the cuts to the beat, and give the audience the occasional longer shot to breathe.",
    related: ["jump-cuts", "montage", "whip-pan"],
    effects: ["energy", "tension"],
    queries: ["fast cuts on the beat music video", "rapid editing montage", "quick cut sequence film"]
  },
  {
    id: "jump-cuts",
    name: "Jump Cuts",
    category: "editing",
    difficulty: "easy",
    blurb: "Cuts within the same shot make the subject appear to jump in time or position.",
    creates: "Creates a feeling of fragmentation, restlessness, anxiety or time skipping forward.",
    useInMV: "Use jump cuts on a static performance shot so the artist twitches between positions, suggesting unease or disconnection.",
    example: "The artist sits in one chair but jump-cuts between slightly different poses, never quite still.",
    mistakes: "Random jump cuts look like editing errors. They work when the displacement is deliberate and rhythmic.",
    related: ["fast-cutting", "fragmented-editing", "glitch-effects"],
    effects: ["unease", "confusion", "tension"],
    queries: ["jump cut music video example", "jump cut editing technique", "jump cuts anxiety sequence film"]
  },
  {
    id: "match-cut",
    name: "Match Cut",
    category: "editing",
    difficulty: "moderate",
    blurb: "A cut from one image to a visually similar image in a different place or time.",
    creates: "Links two ideas symbolically, suggesting connection, transformation or a hidden relationship between them.",
    useInMV: "Match-cut from a spinning record to a spinning wheel, or a closing eye to a setting sun, to connect two ideas in the song.",
    example: "A match cut from the artist closing a door to a coffin lid closing, linking an ending to a loss.",
    mistakes: "If the two images don't truly rhyme in shape or movement, the cut feels random rather than meaningful.",
    related: ["dissolve", "visual-motif", "cross-cutting"],
    effects: ["surreal", "dreamlike", "emotion"],
    queries: ["match cut example film", "graphic match cut editing", "match cut transition music video"]
  },
  {
    id: "cross-cutting",
    name: "Cross-Cutting",
    category: "editing",
    difficulty: "moderate",
    blurb: "Editing back and forth between two separate places, characters or timelines.",
    creates: "Builds tension or draws a comparison, suggesting two things are connected, happening at once, or in conflict.",
    useInMV: "Cut between the artist now and a memory of the same place, or between two characters whose stories are about to collide.",
    example: "Cross-cutting between a calm performance shot and increasingly chaotic narrative shots until the two meet.",
    mistakes: "If the audience can't tell why the two threads belong together, it just feels confusing. Make the link clear.",
    related: ["match-cut", "montage", "split-screen"],
    effects: ["tension", "conflict"],
    queries: ["cross cutting parallel editing example", "intercut two scenes film", "parallel action editing music video"]
  },
  {
    id: "montage",
    name: "Montage",
    category: "editing",
    difficulty: "easy",
    blurb: "A sequence of short shots compressed together to show an idea or passage of time.",
    creates: "Conveys memory, transformation, routine, pressure or emotional build-up quickly and rhythmically.",
    useInMV: "Build a montage of fragments — places, faces, objects — to show a relationship forming or falling apart across a verse.",
    example: "A montage of small everyday moments speeds up across the verse to show a whole summer passing.",
    mistakes: "A montage of random pretty shots says nothing. Each image should add to one clear idea or feeling.",
    related: ["fast-cutting", "cross-cutting", "visual-motif"],
    effects: ["emotion", "energy", "nostalgia"],
    queries: ["montage sequence music video", "memory montage editing", "time passing montage film"]
  },
  {
    id: "fragmented-editing",
    name: "Fragmented Editing",
    category: "editing",
    difficulty: "advanced",
    blurb: "Shots are broken up, repeated and reordered so the sequence feels shattered.",
    creates: "Suggests a fractured identity, mental instability, trauma or a world that no longer holds together.",
    useInMV: "Break a single action into out-of-order fragments during an unstable section to mirror a character falling apart.",
    example: "A fall is shown as scattered fragments — a hand, the floor, a face — repeated and reshuffled out of sequence.",
    mistakes: "Fragmentation can tip into total incoherence. Keep enough thread that the audience feels the chaos rather than just being lost.",
    related: ["jump-cuts", "glitch-effects", "split-screen"],
    effects: ["confusion", "unease", "surreal"],
    queries: ["fragmented editing music video", "non linear shattered editing", "disjointed cutting film"]
  },
  {
    id: "freeze-frame",
    name: "Freeze Frame",
    category: "editing",
    difficulty: "easy",
    blurb: "A single frame is held still so the action stops dead.",
    creates: "Makes a moment feel significant, frozen in time or trapped, and can isolate a single beat from the flow.",
    useInMV: "Freeze on the artist mid-movement at the end of a line so that one image hangs in the audience's mind.",
    example: "The artist leaps and the frame freezes at the top of the jump, suspending them in mid-air.",
    mistakes: "A freeze frame on a bad expression or awkward pose looks like a glitch. Choose the held frame carefully.",
    related: ["slow-motion", "jump-cuts", "repetition"],
    effects: ["emotion", "tension"],
    queries: ["freeze frame music video", "freeze frame ending film", "still frame held shot editing"]
  },
  {
    id: "reverse-motion",
    name: "Reverse Motion",
    category: "editing",
    difficulty: "moderate",
    blurb: "Footage plays backwards.",
    creates: "Suggests regret, memory, undoing, fantasy or an emotional reversal, as actions un-happen before our eyes.",
    useInMV: "Reverse a shot of something breaking so it reassembles, suggesting a wish to undo a moment in the lyrics.",
    example: "Scattered photographs fly back together into a neat pile as the artist watches, time running backwards.",
    mistakes: "Reverse motion reveals itself instantly through unnatural movement. Use it where that strangeness is the point.",
    related: ["slow-motion", "match-cut", "surreal-imagery"],
    effects: ["surreal", "dreamlike", "nostalgia"],
    queries: ["reverse motion shot music video", "rewind effect film", "backwards footage editing example"]
  },
  {
    id: "time-lapse",
    name: "Time-Lapse",
    category: "editing",
    difficulty: "moderate",
    blurb: "A long stretch of time is compressed into a few fast seconds.",
    creates: "Shows time rushing past, making a character feel small, static or left behind as the world races on.",
    useInMV: "Time-lapse a busy street while the artist stays still in the centre to show life moving on without them.",
    example: "A time-lapse of day turning to night over a city while the artist sits motionless on a rooftop.",
    mistakes: "Time-lapse needs a locked-off camera and patience. A shaky or short capture won't read as time passing.",
    related: ["birds-eye-view", "stillness", "wide-shot"],
    effects: ["freedom", "isolation", "artificial"],
    queries: ["time lapse music video", "city time lapse static figure", "day to night time lapse film"]
  },
  {
    id: "split-screen",
    name: "Split Screen",
    category: "editing",
    difficulty: "moderate",
    blurb: "The frame is divided to show two or more images at once.",
    creates: "Sets two things side by side to show conflict, comparison, division or a constructed, designed quality.",
    useInMV: "Split the screen between two versions of the artist, or two characters, to stage a contrast the lyrics describe.",
    example: "A vertical split shows the artist calm on one side and breaking down on the other, both singing the same line.",
    mistakes: "Too many panels overwhelm the eye. Two or three sections is usually enough to make the point.",
    related: ["cross-cutting", "visual-contrast", "fragmented-editing"],
    effects: ["conflict", "artificial"],
    queries: ["split screen music video", "split screen two characters film", "multi panel split screen editing"]
  },
  {
    id: "glitch-effects",
    name: "Glitch Effects",
    category: "editing",
    difficulty: "moderate",
    blurb: "The image distorts, tears or stutters like corrupted digital footage.",
    creates: "Suggests technology, surveillance, a fractured identity, anxiety or a loss of control.",
    useInMV: "Glitch the artist's image during a line about being watched or losing themselves to digital pressure.",
    example: "The artist's face tears and pixelates for a single frame each time a phone buzzes in the track.",
    mistakes: "Heavy glitching everywhere just looks like a broken file. Use it as a punctuation mark, tied to meaning.",
    related: ["jump-cuts", "fragmented-editing", "superimposition"],
    effects: ["unease", "artificial", "confusion"],
    queries: ["glitch effect music video", "digital distortion glitch editing", "datamosh glitch transition"]
  },
  {
    id: "superimposition",
    name: "Superimposition",
    category: "editing",
    difficulty: "moderate",
    blurb: "Two images are layered over each other so both are visible at once.",
    creates: "Connects two ideas, suggests memory or thought, or shows an inner world bleeding into the outer one.",
    useInMV: "Layer a memory or a face over a present-day shot so the past visibly haunts the character.",
    example: "A ghostly image of a face is superimposed over a rain-streaked window the artist stares through.",
    mistakes: "Layering too many images turns the frame to mush. Keep both layers readable and the meaning clear.",
    related: ["double-exposure", "dissolve", "match-cut"],
    effects: ["dreamlike", "nostalgia", "emotion"],
    queries: ["superimposition double image music video", "layered images film effect", "ghostly overlay editing"]
  },
  {
    id: "double-exposure",
    name: "Double Exposure",
    category: "editing",
    difficulty: "advanced",
    blurb: "A figure is filled with a second image, like a landscape inside a silhouette.",
    creates: "Visually merges a person with a place, memory or idea, creating a poetic, dreamlike or symbolic effect.",
    useInMV: "Fill a profile of the artist with a cityscape or a sea to suggest the place lives inside them.",
    example: "A double exposure shows a forest moving inside the dark silhouette of the artist's head.",
    mistakes: "Without strong contrast the two images muddy each other. A clear silhouette and a bold second image work best.",
    related: ["superimposition", "silhouette", "surreal-imagery"],
    effects: ["dreamlike", "surreal", "intimacy"],
    queries: ["double exposure portrait music video", "double exposure silhouette landscape", "double exposure effect film"]
  },
  {
    id: "dissolve",
    name: "Dissolve",
    category: "editing",
    difficulty: "easy",
    blurb: "One shot fades into the next, briefly overlapping.",
    creates: "Suggests the passing of time, memory, dreaming or a gentle connection between two images.",
    useInMV: "Dissolve slowly between locations across a calm section so the video drifts like a memory rather than cutting sharply.",
    example: "A face dissolves softly into a wide shot of the sea, blending person and place.",
    mistakes: "Dissolving every cut makes the video feel soft and shapeless. Reserve it for moments that need that drift.",
    related: ["match-cut", "superimposition", "fade-to-black"],
    effects: ["nostalgia", "dreamlike", "emotion"],
    queries: ["dissolve transition film", "cross dissolve editing example", "dreamy dissolve music video"]
  },
  {
    id: "fade-to-black",
    name: "Fade to Black",
    category: "editing",
    difficulty: "easy",
    blurb: "The image gradually darkens to a black screen.",
    creates: "Signals an ending, loss, silence, death or emotional closure, giving the audience a moment of nothing.",
    useInMV: "Fade to black at the end of a verse before the final chorus to mark a clear emotional turning point.",
    example: "The artist closes their eyes and the frame fades slowly to black before the song's quietest line.",
    mistakes: "Fading to black mid-energy kills momentum. Use it where a pause genuinely serves the song.",
    related: ["dissolve", "freeze-frame", "low-key-lighting"],
    effects: ["emotion", "isolation"],
    queries: ["fade to black ending film", "fade out transition editing", "fade to black music video"]
  },

  /* ---------------------------- LIGHTING --------------------------------- */
  {
    id: "low-key-lighting",
    name: "Low-Key Lighting",
    category: "lighting",
    difficulty: "moderate",
    blurb: "Mostly darkness with small, hard pools of light and deep shadows.",
    creates: "Builds mystery, fear, secrecy, danger or emotional heaviness by hiding most of the frame in shadow.",
    useInMV: "Light only one side of the artist's face during a dark or secretive lyric so half of them stays hidden.",
    example: "A single hard light catches the artist's eyes while the rest of the room falls into black.",
    mistakes: "Too dark and the audience can't see anything; the trick is controlled shadow, not no light. Avoid flat, even fill.",
    related: ["high-key-lighting", "silhouette", "spotlight"],
    effects: ["tension", "unease", "power"],
    queries: ["low key lighting portrait", "chiaroscuro lighting film", "moody single light music video"]
  },
  {
    id: "high-key-lighting",
    name: "High-Key Lighting",
    category: "lighting",
    difficulty: "easy",
    blurb: "Bright, even lighting with few shadows.",
    creates: "Creates safety, innocence, a clean pop or commercial feel — or an unsettling, artificial 'too perfect' happiness.",
    useInMV: "Flood a white set with even light for a bright pop performance, or use that perfection to hint something is fake.",
    example: "The artist performs in a bright, shadowless white room that feels cheerful but slightly unreal.",
    mistakes: "Flat lighting can look like a cheap home video if it isn't intentional. Make the brightness a clear choice.",
    related: ["low-key-lighting", "symbolic-colour", "desaturation"],
    effects: ["artificial", "energy"],
    queries: ["high key lighting music video", "bright even lighting pop video", "white set high key film"]
  },
  {
    id: "backlighting",
    name: "Backlighting",
    category: "lighting",
    difficulty: "moderate",
    blurb: "The main light comes from behind the subject, rimming them with light.",
    creates: "Separates a figure from the background, creates a glowing, powerful or mysterious look, and can hide the face.",
    useInMV: "Backlight the artist in a doorway or against a window so they glow and seem larger than life.",
    example: "The artist walks toward camera backlit by headlights, their edges burning with light and their face in shadow.",
    mistakes: "Without any front light the subject becomes a full silhouette, which may not be what you want. Balance it on purpose.",
    related: ["silhouette", "low-angle-shot", "neon-lighting"],
    effects: ["power", "dreamlike", "tension"],
    queries: ["backlighting rim light portrait", "backlit silhouette music video", "back light glow cinematography"]
  },
  {
    id: "silhouette",
    name: "Silhouette",
    category: "lighting",
    difficulty: "moderate",
    blurb: "The subject appears as a black shape against a bright background.",
    creates: "Hides identity and emotion, suggesting mystery, anonymity, power or a loss of self.",
    useInMV: "Show the artist only in silhouette during a line about hiding or losing themselves so the audience can't read their face.",
    example: "A silhouetted figure stands in a doorway flooded with light, faceless and unreadable.",
    mistakes: "If a little light spills onto the face it becomes a half-lit shot, not a silhouette. Keep the front completely dark.",
    related: ["backlighting", "low-key-lighting", "double-exposure"],
    effects: ["isolation", "power", "surreal"],
    queries: ["silhouette shot music video", "silhouette against window film", "backlit silhouette figure"]
  },
  {
    id: "neon-lighting",
    name: "Neon Lighting",
    category: "lighting",
    difficulty: "moderate",
    blurb: "Coloured neon or LED light, often pink, blue or red, fills the scene.",
    creates: "Creates a modern, nightlife, dreamlike or emotionally unstable mood with a strong artificial edge.",
    useInMV: "Light a night-time performance in clashing neon colours to suggest a glamorous but hollow, unstable world.",
    example: "The artist's face is split by pink and blue neon as rain falls outside a late-night window.",
    mistakes: "Neon everything becomes a cliché. Let the colours mean something — link them to the emotion, not just the look.",
    related: ["cold-colour-palette", "symbolic-colour", "shallow-depth-of-field"],
    effects: ["artificial", "dreamlike", "unease"],
    queries: ["neon lighting music video", "pink blue neon portrait", "neon night cinematography"]
  },
  {
    id: "natural-lighting",
    name: "Natural Lighting",
    category: "lighting",
    difficulty: "easy",
    blurb: "The scene is lit only by available daylight.",
    creates: "Creates realism, honesty, simplicity and emotional authenticity, as if nothing has been staged.",
    useInMV: "Shoot an intimate acoustic moment by a window in soft daylight so it feels real and unguarded.",
    example: "The artist sits by a window in soft morning light, the look plain and honest.",
    mistakes: "Natural light changes fast and can be flat or harsh. Shoot near a window or in the golden hour for the best results.",
    related: ["soft-focus", "documentary-realism", "warm-colour-palette"],
    effects: ["realism", "intimacy", "nostalgia"],
    queries: ["natural light portrait window", "available light music video", "soft daylight cinematography"]
  },
  {
    id: "spotlight",
    name: "Spotlight",
    category: "lighting",
    difficulty: "moderate",
    blurb: "A single concentrated beam isolates the subject in a circle of light.",
    creates: "Isolates and exposes a character, suggesting performance, judgement, pressure or singular importance.",
    useInMV: "Drop a single spotlight on the artist in a black space so they seem exposed and alone on a stage.",
    example: "A hard spotlight catches the artist in an otherwise pitch-black room, like a confession under interrogation.",
    mistakes: "A soft, wide pool isn't a spotlight. Keep the beam tight and the surroundings dark for the effect to work.",
    related: ["low-key-lighting", "negative-space", "solo-performance"],
    effects: ["isolation", "vulnerability", "tension"],
    queries: ["spotlight single beam music video", "spotlight dark stage film", "isolated spotlight portrait"]
  },

  /* ---------------------------- COLOUR ----------------------------------- */
  {
    id: "colour-grading",
    name: "Colour Grading",
    category: "colour",
    difficulty: "moderate",
    blurb: "Adjusting the colours of footage in editing to set a consistent mood.",
    creates: "Unifies the look of a video and steers the emotional temperature — warm and inviting, or cold and clinical.",
    useInMV: "Grade the whole video toward one consistent tone so even mismatched footage feels like a single, deliberate world.",
    example: "Footage shot on different days is graded with the same teal-and-orange look so the video feels unified.",
    mistakes: "Heavy, extreme grading can crush detail and look amateur. Aim for a tone that supports the song, not a filter for its own sake.",
    related: ["desaturation", "warm-colour-palette", "cold-colour-palette"],
    effects: ["artificial", "emotion", "nostalgia"],
    queries: ["colour grading before after music video", "cinematic colour grade example", "film look grading tutorial still"]
  },
  {
    id: "desaturation",
    name: "Desaturation",
    category: "colour",
    difficulty: "easy",
    blurb: "Colour is drained from the image so it looks washed-out or near grey.",
    creates: "Suggests sadness, numbness, boredom, memory or emotional exhaustion by removing the vibrancy of the world.",
    useInMV: "Desaturate the present-day shots and keep memories in colour to show how flat life feels now.",
    example: "A near-grey shot of the artist on a rainy street, all the colour drained out of the day.",
    mistakes: "Full black-and-white is a different, stronger choice. Partial desaturation should still feel intentional, not like a faulty camera.",
    related: ["cold-colour-palette", "colour-grading", "documentary-realism"],
    effects: ["isolation", "emotion", "nostalgia"],
    queries: ["desaturated colour grade film", "washed out music video", "muted colour cinematography"]
  },
  {
    id: "warm-colour-palette",
    name: "Warm Colour Palette",
    category: "colour",
    difficulty: "easy",
    blurb: "The image leans toward reds, oranges and golds.",
    creates: "Creates warmth, intimacy, nostalgia, comfort or romance, like late-afternoon sunlight.",
    useInMV: "Bathe a happy memory or a tender moment in golden, warm tones so it feels safe and longed-for.",
    example: "Two figures laugh in a field at golden hour, everything washed in warm amber light.",
    mistakes: "Pushing the warmth too far turns skin orange. Keep it believable unless the artificial look is the point.",
    related: ["cold-colour-palette", "soft-focus", "natural-lighting"],
    effects: ["nostalgia", "intimacy"],
    queries: ["warm colour palette golden hour", "orange warm grade music video", "nostalgic warm tones film"]
  },
  {
    id: "cold-colour-palette",
    name: "Cold Colour Palette",
    category: "colour",
    difficulty: "easy",
    blurb: "The image leans toward blues, greys and teals.",
    creates: "Creates isolation, sadness, distance, coldness or unease, draining warmth from the world.",
    useInMV: "Grade lonely or alienated scenes cold and blue so the artist feels emotionally frozen and far away.",
    example: "A blue-grey wide shot of the artist alone on a winter beach, the cold colour matching their mood.",
    mistakes: "An over-blue image can look like a broken white balance. Keep skin tones readable so it reads as a choice.",
    related: ["warm-colour-palette", "desaturation", "neon-lighting"],
    effects: ["isolation", "unease"],
    queries: ["cold blue colour grade film", "teal cold palette music video", "icy blue tones cinematography"]
  },
  {
    id: "symbolic-colour",
    name: "Symbolic Colour",
    category: "colour",
    difficulty: "moderate",
    blurb: "A specific colour is used repeatedly to stand for an idea or emotion.",
    creates: "Lets a single colour carry meaning — red for danger or passion, white for innocence or emptiness, green for envy or decay.",
    useInMV: "Dress the artist in red as a relationship turns dangerous, then strip the colour away once it ends.",
    example: "A single red coat recurs throughout an otherwise grey video, marking each moment of desire.",
    mistakes: "Don't rely on the colour alone — support it with action and context so the audience reads the meaning you intend.",
    related: ["visual-motif", "costume-contrast", "colour-grading"],
    effects: ["surreal", "emotion", "conflict"],
    queries: ["symbolic use of colour film", "colour symbolism red music video", "single colour motif cinematography"]
  },
  {
    id: "visual-contrast",
    name: "Visual Contrast",
    category: "colour",
    difficulty: "easy",
    blurb: "Two strongly opposing colours or tones are placed against each other.",
    creates: "Shows conflict, division or dual identity — light against dark, warm against cold, one world against another.",
    useInMV: "Split the video between a warm world and a cold world so the contrast itself tells the story of a change.",
    example: "The chorus is bright and warm; the verse is cold and dark, and the artist crosses between them.",
    mistakes: "Contrast for its own sake is just noise. Tie the opposing looks to two genuinely opposing ideas in the song.",
    related: ["symbolic-colour", "binary-opposition", "location-contrast"],
    effects: ["conflict", "artificial"],
    queries: ["colour contrast two tones film", "warm vs cold contrast music video", "high contrast colour cinematography"]
  },

  /* ------------------------ MISE-EN-SCÈNE -------------------------------- */
  {
    id: "framing-within-frames",
    name: "Framing Within Frames",
    category: "mise-en-scene",
    difficulty: "moderate",
    blurb: "The subject is framed by something inside the shot — a doorway, window, mirror or screen.",
    creates: "Suggests entrapment, separation, observation or emotional distance, boxing the character in.",
    useInMV: "Shoot the artist through a doorway or window frame so they seem trapped or watched within their own video.",
    example: "The artist is framed in a distant doorway at the end of a corridor, hemmed in by the architecture.",
    mistakes: "The inner frame must be obvious and meaningful. A vague edge in the foreground doesn't read as a frame.",
    related: ["mirrors-reflections", "negative-space", "barriers-in-frame"],
    effects: ["isolation", "tension", "unease"],
    queries: ["frame within a frame composition", "doorway framing shot film", "window frame composition music video"]
  },
  {
    id: "negative-space",
    name: "Negative Space",
    category: "mise-en-scene",
    difficulty: "easy",
    blurb: "Large empty areas of the frame surround a small subject.",
    creates: "Makes a character feel small, lonely, vulnerable or emotionally distant within all that emptiness.",
    useInMV: "Place the artist in one corner of a wide, empty frame so the surrounding space presses in on them.",
    example: "The artist sits tiny in the bottom corner of the frame, the rest a vast empty grey wall.",
    mistakes: "Empty space only works if it's deliberate and balanced. A subject lost by accident just looks badly framed.",
    related: ["wide-shot", "framing-within-frames", "centred-framing"],
    effects: ["isolation", "vulnerability", "emotion"],
    queries: ["negative space composition photography", "lonely figure empty frame film", "negative space music video"]
  },
  {
    id: "centred-framing",
    name: "Centred Framing",
    category: "mise-en-scene",
    difficulty: "easy",
    blurb: "The subject is placed dead centre and often symmetrically.",
    creates: "Makes a character seem important, controlled, confronting or, paradoxically, trapped and exposed by the symmetry.",
    useInMV: "Centre the artist perfectly and hold the camera still for a confident, commanding direct-to-camera performance.",
    example: "The artist stands dead centre of a symmetrical room staring down the lens, perfectly balanced.",
    mistakes: "Centred framing can feel static if every shot does it. Use it for impact, then break the symmetry to show change.",
    related: ["negative-space", "direct-address", "low-angle-shot"],
    effects: ["power", "status", "artificial"],
    queries: ["centred symmetrical framing film", "centre frame composition music video", "symmetry shot cinematography"]
  },
  {
    id: "mirrors-reflections",
    name: "Mirrors & Reflections",
    category: "mise-en-scene",
    difficulty: "moderate",
    blurb: "The subject is shown in a mirror, window or other reflective surface.",
    creates: "Suggests self-image, split identity, truth, insecurity or self-confrontation by doubling the character.",
    useInMV: "Film the artist talking to their own reflection during a line about self-doubt so they appear divided in two.",
    example: "The artist faces a cracked mirror, the fracture splitting their reflection into pieces.",
    mistakes: "Watch for the camera appearing in the mirror, and make sure the reflection means something rather than just looking neat.",
    related: ["framing-within-frames", "over-the-shoulder-shot", "fragmented-editing"],
    effects: ["confusion", "intimacy", "surreal"],
    queries: ["mirror reflection shot music video", "broken mirror identity film", "reflection composition cinematography"]
  },
  {
    id: "symbolic-props",
    name: "Symbolic Props",
    category: "mise-en-scene",
    difficulty: "easy",
    blurb: "An object in the scene carries meaning beyond its literal use.",
    creates: "Lets a single object stand for an idea — a phone for surveillance, a photograph for loss, chains for control, water for emotion.",
    useInMV: "Give the artist a recurring object — a wilting flower, a ringing phone — that visually tracks the song's emotional journey.",
    example: "A single wilting flower the artist carries through the video slowly loses its petals as the song darkens.",
    mistakes: "Don't overload one shot with symbols, and don't make the meaning so obscure no one can read it. One clear object is stronger than five.",
    related: ["visual-motif", "extreme-close-up", "symbolic-colour"],
    effects: ["surreal", "emotion"],
    queries: ["symbolic prop music video", "meaningful object film still", "object symbolism cinematography"]
  },
  {
    id: "costume-contrast",
    name: "Costume Contrast",
    category: "mise-en-scene",
    difficulty: "easy",
    blurb: "What characters wear is set in deliberate opposition.",
    creates: "Shows difference in status, identity, allegiance or transformation through clothing.",
    useInMV: "Dress the artist in white among a crowd in black to mark them as separate, innocent or singled out.",
    example: "The artist in a bright red coat moves through a crowd dressed entirely in grey.",
    mistakes: "If the contrast isn't clear at a glance it's lost. Make the difference bold and consistent.",
    related: ["visual-contrast", "location-contrast", "symbolic-colour"],
    effects: ["conflict", "status"],
    queries: ["costume contrast film", "one character different clothing music video", "costume colour symbolism"]
  },
  {
    id: "location-contrast",
    name: "Location Contrast",
    category: "mise-en-scene",
    difficulty: "moderate",
    blurb: "Two clearly different settings are set against each other.",
    creates: "Shows opposing worlds, emotional states or stages of a journey — nature against the city, home against the wild.",
    useInMV: "Cut between a cramped indoor space and an open landscape to contrast the artist's trapped and free selves.",
    example: "Verses in a grey concrete stairwell cut against a chorus on an open, sunlit hilltop.",
    mistakes: "If the two locations don't clearly represent something, the contrast is just scenery. Make each place mean something.",
    related: ["visual-contrast", "wide-shot", "binary-opposition"],
    effects: ["conflict", "freedom"],
    queries: ["contrasting locations music video", "indoor outdoor contrast film", "two worlds setting cinematography"]
  },
  {
    id: "barriers-in-frame",
    name: "Barriers in Frame",
    category: "mise-en-scene",
    difficulty: "easy",
    blurb: "Fences, windows, screens or walls sit between the camera and the subject.",
    creates: "Suggests separation, entrapment, observation or emotional distance by literally putting something in the way.",
    useInMV: "Shoot the artist behind a rain-streaked window or a wire fence during a line about feeling shut out.",
    example: "The artist presses a hand against a window we view them through, the glass keeping us apart.",
    mistakes: "The barrier must be readable. If it just clutters the foreground without meaning, it weakens the shot.",
    related: ["framing-within-frames", "negative-space", "mirrors-reflections"],
    effects: ["isolation", "tension", "unease"],
    queries: ["shooting through fence film", "barrier in foreground composition", "window glass separation music video"]
  },
  {
    id: "foreground-background-contrast",
    name: "Foreground / Background Contrast",
    category: "mise-en-scene",
    difficulty: "moderate",
    blurb: "Something close to camera is set against something further away.",
    creates: "Shows power, threat, distance or hidden meaning by playing near and far elements off each other.",
    useInMV: "Keep the artist large in the foreground while a small, important figure lingers in the background, watching.",
    example: "The artist sings in the foreground while, far behind, a tiny figure slowly walks away.",
    mistakes: "If the audience doesn't notice the background element, the meaning is lost. Guide the eye with focus and light.",
    related: ["deep-focus", "framing-within-frames", "negative-space"],
    effects: ["tension", "conflict", "status"],
    queries: ["foreground background staging film", "depth staging composition", "background figure foreground subject"]
  },

  /* ------------------------- PERFORMANCE --------------------------------- */
  {
    id: "direct-address",
    name: "Direct Address",
    category: "performance",
    difficulty: "easy",
    blurb: "The performer looks straight into the camera lens.",
    creates: "Breaks the barrier between artist and audience, creating confrontation, honesty, intimacy or challenge.",
    useInMV: "Have the artist hold eye contact with the lens during the most personal or defiant line so it feels aimed at the viewer.",
    example: "The artist stares directly down the lens and holds it through the whole final chorus without blinking.",
    mistakes: "Constant direct address loses its power. Save the held look for the moments that should feel like a direct message.",
    related: ["close-up", "centred-framing", "performance-to-camera"],
    effects: ["intimacy", "conflict"],
    queries: ["direct address to camera music video", "eye contact lens performance", "looking at camera film"]
  },
  {
    id: "performance-to-camera",
    name: "Lip-Sync Performance",
    category: "sound-image",
    difficulty: "easy",
    blurb: "The artist mimes the lyrics convincingly to the track.",
    creates: "Ties the visuals tightly to the song, intensifies emotion and keeps the audience connected to the words being sung.",
    useInMV: "Make sure the artist's lip-sync is sharp on the hook so the audience feels the lyric is being delivered to them live.",
    example: "A tight performance shot where every word lands perfectly in sync with the vocal, selling the emotion of the line.",
    mistakes: "Loose, out-of-time lip-sync instantly looks amateur. Rehearse to the track and shoot enough takes to nail it.",
    related: ["direct-address", "close-up", "choreographed-movement"],
    effects: ["intimacy", "energy", "emotion"],
    queries: ["lip sync performance music video", "convincing lip sync shot", "performance to camera singer"]
  },
  {
    id: "choreographed-movement",
    name: "Choreographed Movement",
    category: "performance",
    difficulty: "advanced",
    blurb: "Dance or repeated, designed movement performed to the track.",
    creates: "Shows control, unity, routine, performance or social pressure through bodies moving in time.",
    useInMV: "Use a group moving in perfect unison to suggest conformity, or a solo dancer breaking from them to show rebellion.",
    example: "A line of dancers move identically while the artist gradually falls out of step with the group.",
    mistakes: "Under-rehearsed choreography looks messy and undercuts the song. Either commit to tight movement or keep it simple.",
    related: ["group-movement", "steadicam", "repetition"],
    effects: ["energy", "status", "artificial"],
    queries: ["choreography music video", "synchronised dance shot", "group choreography performance film"]
  },
  {
    id: "stillness",
    name: "Stillness",
    category: "performance",
    difficulty: "easy",
    blurb: "A performer stays completely still while everything else moves.",
    creates: "Suggests isolation, shock, numbness, resistance or quiet power amid surrounding motion.",
    useInMV: "Keep the artist frozen and calm while a crowd rushes around them to set them apart from the world.",
    example: "The artist stands motionless on a busy platform as commuters blur past on either side.",
    mistakes: "Stillness needs contrast to read; if everything is still, it just looks static. Surround it with movement.",
    related: ["time-lapse", "negative-space", "solo-performance"],
    effects: ["isolation", "unease", "emotion"],
    queries: ["still figure moving crowd music video", "stillness amid motion film", "motionless subject busy background"]
  },
  {
    id: "solo-performance",
    name: "Solo Performance",
    category: "performance",
    difficulty: "easy",
    blurb: "A single performer alone in a space.",
    creates: "Suggests vulnerability, independence, grief, reflection or freedom, with nothing to hide behind.",
    useInMV: "Place the artist alone in a large empty space for a stripped-back, emotional section so all attention falls on them.",
    example: "The artist sings alone in the middle of an empty warehouse, the emptiness amplifying their loneliness.",
    mistakes: "A solo shot can feel flat without strong lighting, framing or movement to support it. Don't rely on the performer alone.",
    related: ["negative-space", "spotlight", "stillness"],
    effects: ["vulnerability", "isolation", "emotion"],
    queries: ["solo performer empty space music video", "single artist alone film", "lone performance shot"]
  },
  {
    id: "group-movement",
    name: "Group Movement",
    category: "performance",
    difficulty: "moderate",
    blurb: "A crowd or group moves together as one.",
    creates: "Suggests conformity, social pressure, ritual, power or belonging through collective motion.",
    useInMV: "Have a crowd move in unison toward or around the artist to show the pressure to fit in or be swept along.",
    example: "A crowd surges in one direction while the artist tries to push the opposite way.",
    mistakes: "A disorganised crowd reads as extras milling about. The group must move with clear, unified intent.",
    related: ["choreographed-movement", "solo-performance", "stillness"],
    effects: ["status", "conflict", "energy"],
    queries: ["crowd moving together music video", "group movement choreography film", "crowd unison motion shot"]
  },

  /* -------------------------- SYMBOLISM ---------------------------------- */
  {
    id: "repetition",
    name: "Repetition",
    category: "symbolism",
    difficulty: "easy",
    blurb: "A shot, action or image is repeated through the video.",
    creates: "Suggests routine, obsession, pressure, memory or being trapped in a cycle.",
    useInMV: "Return to the same shot or gesture each chorus, changing it slightly each time to show how a character is unravelling.",
    example: "The artist walks through the same doorway in every chorus, looking a little more worn each time.",
    mistakes: "Pure repetition with no change becomes boring. Let each return carry a small difference that builds meaning.",
    related: ["visual-motif", "jump-cuts", "freeze-frame"],
    effects: ["unease", "emotion", "surreal"],
    queries: ["repeated shot motif music video", "repetition editing film", "recurring image symbolism"]
  },
  {
    id: "visual-motif",
    name: "Visual Motif",
    category: "symbolism",
    difficulty: "moderate",
    blurb: "A recurring image, colour, object or action that builds meaning across the video.",
    creates: "Develops a theme over time, so that by the end a simple image carries the weight of everything it has appeared with.",
    useInMV: "Thread one image — falling water, a colour, a gesture — through the whole video so it gathers meaning each time it returns.",
    example: "Birds appear at every turning point — caged in the verse, flying free in the final chorus.",
    mistakes: "A motif only works if it recurs and develops. One appearance is just a shot; make sure it comes back and grows.",
    related: ["repetition", "symbolic-props", "symbolic-colour"],
    effects: ["surreal", "emotion"],
    queries: ["visual motif music video", "recurring symbol film analysis", "motif development cinematography"]
  },
  {
    id: "surreal-imagery",
    name: "Surreal Imagery",
    category: "symbolism",
    difficulty: "advanced",
    blurb: "Dreamlike or impossible images that don't obey real-world logic.",
    creates: "Expresses emotion and ideas rather than literal events, creating a symbolic, dreamlike or unsettling effect.",
    useInMV: "Show an impossible image — a room filling with water, a figure floating — to externalise a feeling words can't capture.",
    example: "The artist sings calmly as the room slowly floods around them and furniture drifts past.",
    mistakes: "Strange for the sake of strange confuses rather than moves. Anchor surreal images to a real emotion in the song.",
    related: ["double-exposure", "reverse-motion", "symbolic-props"],
    effects: ["surreal", "dreamlike", "confusion"],
    queries: ["surreal imagery music video", "dreamlike impossible shot film", "surrealist visuals cinematography"]
  },
  {
    id: "binary-opposition",
    name: "Binary Opposition",
    category: "symbolism",
    difficulty: "moderate",
    blurb: "Two opposing worlds or ideas are set against each other across the video.",
    creates: "Dramatises conflict — innocence against corruption, freedom against control — by building the whole video around a clash.",
    useInMV: "Structure the video as two visual worlds the artist moves between, each shot, lit and coloured as opposites.",
    example: "A bright natural world and a dark artificial one alternate, and the artist must finally choose between them.",
    mistakes: "The two sides must be clearly opposed and clearly meaningful. Vague differences won't read as opposition.",
    related: ["visual-contrast", "location-contrast", "cross-cutting"],
    effects: ["conflict", "artificial"],
    queries: ["binary opposition film analysis", "two opposing worlds music video", "contrast worlds storytelling"]
  },

  /* ----------------------- SOUND & IMAGE --------------------------------- */
  {
    id: "documentary-realism",
    name: "Documentary Realism",
    category: "sound-image",
    difficulty: "moderate",
    blurb: "The video is shot to look like real, unstaged documentary footage.",
    creates: "Creates honesty, authenticity and emotional truth, as if we're watching real life rather than a performance.",
    useInMV: "Shoot handheld with natural light and real locations so an emotional song feels like a genuine, lived moment.",
    example: "Grainy handheld footage follows the artist through a real neighbourhood, with passers-by who aren't actors.",
    mistakes: "Too polished and it stops feeling real; too sloppy and it just looks careless. Aim for controlled rawness.",
    related: ["handheld-camera", "natural-lighting", "found-footage-aesthetic"],
    effects: ["realism", "intimacy"],
    queries: ["documentary style music video", "naturalistic realism film", "handheld real life footage music"]
  },
  {
    id: "found-footage-aesthetic",
    name: "Found Footage Aesthetic",
    category: "sound-image",
    difficulty: "moderate",
    blurb: "The video imitates old home video, phone clips or archive footage.",
    creates: "Suggests memory, nostalgia, authenticity or a constructed sense of the 'real', as if the footage was discovered.",
    useInMV: "Cut in fake home-video clips with timestamps and grain to make a nostalgic song feel like a recovered memory.",
    example: "Faded camcorder footage with a date stamp shows childhood scenes between the polished present-day shots.",
    mistakes: "The format must match the era and feeling. A crisp modern clip pretending to be old footage breaks the illusion.",
    related: ["documentary-realism", "desaturation", "glitch-effects"],
    effects: ["nostalgia", "realism", "artificial"],
    queries: ["found footage aesthetic music video", "vhs home video look film", "camcorder retro footage effect"]
  }
];

/* ----------------------------------------------------------------------------
   VISUAL RECIPES (Suggested Combinations)
   ---------------------------------------------------------------------------- */

const COMBINATIONS = [
  {
    id: "alienation",
    name: "Alienation",
    summary: "A character cut off from the world, swallowed by cold, empty space.",
    techniques: ["wide-shot", "negative-space", "cold-colour-palette", "slow-motion"],
    note: "Wide framing and negative space shrink the figure; a cold grade and slow pacing drain the warmth and energy out of every moment."
  },
  {
    id: "power",
    name: "Power",
    summary: "A commanding figure who owns the frame and the world around them.",
    techniques: ["low-angle-shot", "centred-framing", "backlighting", "steadicam"],
    note: "Looking up at a centred, backlit figure makes them tower; controlled, smooth movement signals that nothing rattles them."
  },
  {
    id: "anxiety",
    name: "Anxiety",
    summary: "A nervous, unstable world that never lets the audience settle.",
    techniques: ["handheld-camera", "jump-cuts", "close-up", "low-key-lighting"],
    note: "Shaky framing and jump cuts fracture the calm; tight close-ups trap us with the emotion while shadows hide what's coming."
  },
  {
    id: "nostalgia",
    name: "Nostalgia",
    summary: "A softened, golden memory you can almost reach but never return to.",
    techniques: ["warm-colour-palette", "soft-focus", "slow-motion", "found-footage-aesthetic"],
    note: "Warm tones and soft focus blur the edges of memory; slow motion and faded home-video footage make it feel treasured and gone."
  },
  {
    id: "chaos",
    name: "Chaos",
    summary: "An overwhelming rush where the images can barely keep up.",
    techniques: ["fast-cutting", "whip-pan", "dutch-angle", "fragmented-editing"],
    note: "Rapid cuts and whip pans drive the pace past comfort; tilted angles and shattered editing tip the whole world off balance."
  },
  {
    id: "intimacy",
    name: "Intimacy",
    summary: "A close, tender, honest connection between artist and audience.",
    techniques: ["close-up", "shallow-depth-of-field", "natural-lighting", "slow-motion"],
    note: "Close-ups and shallow focus let nothing but the person exist; natural light and slower editing keep it gentle and real."
  },
  {
    id: "surrealism",
    name: "Surrealism",
    summary: "A symbolic dream-world where meaning matters more than reality.",
    techniques: ["symbolic-props", "double-exposure", "neon-lighting", "fragmented-editing"],
    note: "Symbolic objects and layered double exposures speak in images; unreal colour and non-linear editing free the video from logic."
  }
];

/* Expose to the app (works when opened directly as a file, no server needed). */
window.VT = { CATEGORIES, DIFFICULTIES, EFFECTS, TECHNIQUES, COMBINATIONS };
