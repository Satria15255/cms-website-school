import type { AuditEntry } from "./audit.types";

export const GENESIS = "0".repeat(64);

export const sha256 = async (text: string): Promise<string> => {
	const buf = await crypto.subtle.digest(
		"SHA-256",
		new TextEncoder().encode(text),
	);
	return [...new Uint8Array(buf)]
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
};

// Hash tiap entri mencakup hash entri sebelumnya, jadi mengubah satu entri mematahkan seluruh rantai setelahnya.
export const entryHash = (e: Omit<AuditEntry, "hash">) =>
	sha256(
		JSON.stringify([
			e.prevHash,
			e.id,
			e.timestamp,
			e.userId,
			e.module,
			e.action,
			e.summary,
			e.entity,
			e.target,
			e.before ?? null,
			e.after ?? null,
		]),
	);

export const verifyChain = async (
	ascending: AuditEntry[],
): Promise<{ valid: boolean; checked: number; brokenAt?: string }> => {
	let prev = GENESIS;
	for (const e of ascending) {
		if (e.prevHash !== prev || (await entryHash(e)) !== e.hash)
			return {
				valid: false,
				checked: ascending.indexOf(e),
				brokenAt: e.id,
			};
		prev = e.hash;
	}
	return { valid: true, checked: ascending.length };
};
