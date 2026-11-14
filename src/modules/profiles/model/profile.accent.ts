export const PROFILE_ACCENT_TONES = ["lime", "sage", "sand", "mist", "slate", "clay", "olive", "steel"] as const;

export type ProfileAccentTone = (typeof PROFILE_ACCENT_TONES)[number];

const PROFILE_ACCENT_SWATCH_CLASSNAMES: Record<ProfileAccentTone, string> = {
    lime: "bg-[#DCEB97]",
    sage: "bg-[#C9D7B8]",
    sand: "bg-[#E9DEB7]",
    mist: "bg-[#D7E3DF]",
    slate: "bg-[#D4D9E4]",
    clay: "bg-[#E1D1C8]",
    olive: "bg-[#C8CF9E]",
    steel: "bg-[#CBD6DE]",
};

function hashString(value: string) {
    let hash = 0;

    for (let index = 0; index < value.length; index += 1) {
        hash = (hash << 5) - hash + value.charCodeAt(index);
        hash |= 0;
    };

    return Math.abs(hash);
};

export function pickProfileAccentTone(seed: string): ProfileAccentTone {
    const index = hashString(seed) % PROFILE_ACCENT_TONES.length;

    return PROFILE_ACCENT_TONES[index];
};

export function resolveProfileAccentTone(profile: { id: string; accentTone?: ProfileAccentTone; }) {
    return profile.accentTone ?? pickProfileAccentTone(profile.id);
};

export function getProfileAccentSwatchClassName(tone: ProfileAccentTone) {
    return PROFILE_ACCENT_SWATCH_CLASSNAMES[tone];
};