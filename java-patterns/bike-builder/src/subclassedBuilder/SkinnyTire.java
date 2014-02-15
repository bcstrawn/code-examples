package subclassedBuilder;

public class SkinnyTire implements Tire {
	@Override
	public int speedModifier() {
		return 2;
	}
}
