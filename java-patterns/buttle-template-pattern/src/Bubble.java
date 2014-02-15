
public abstract class Bubble {
	protected int length;
	
	public void doSort() {
		for (int j = 0; j < length-1; j++) {
			for (int i = 0; i < length-1; i++) {
				if (outOfOrder(i)) {
					swap(i);
				}
			}
		}
	}

	protected abstract void swap(int i);
	protected abstract boolean outOfOrder(int i);
}
