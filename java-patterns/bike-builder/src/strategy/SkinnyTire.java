package strategy;

public class SkinnyTire implements Tire {
	@Override
	public int speedModifier() {
		return 2;
	}
}
