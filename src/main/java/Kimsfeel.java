import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.File;

import javax.imageio.ImageIO;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;

/**
 * 입력 텍스트를 이미지로 만들어 준다 
 * @author parkwon
 * @since 2017.03.24
 */
public class Kimsfeel {

	
	public static void main(String[] args) {
		
		
		StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();  
		
		encryptor.setAlgorithm("PBEWITHMD5ANDDES");  
		encryptor.setPassword("enixClever-ESM");
		String encryptedPass = encryptor.encrypt("asdf1234");
        String decryptedPass = encryptor.decrypt(encryptedPass);
        System.out.println("Encrypted Password for admin is : "+encryptedPass);  
        System.out.println("Decrypted Password for admin is : "+decryptedPass);  
		
		
	}
	
	
	
	
    /**
     * 테스트용 진입점
     * @param args 파라미터 
     * @since 2017.03.24
     */
    public static void main1(String[] args)
    {
        try{
            new Kimsfeel();  
        }catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    /**
     * 생성자
     * @since 2017.03.24
     */
    Kimsfeel() throws Exception
    {
        String[] texts = {"김홍길 대령"};
        drawTextWithImage(texts
                , "C:\\Temp\\"+texts[0]+".png"
                , "C:\\Temp\\box_template.png");
    }

    /**
     * 웹 이미지 내부에 텍스트를 포함하여 이미지로 만들어준다
     * @param texts 텍스트 문자열 
     * @param fileLoc 파일위치
     * @param backgrondImageURL 웹이미지 주소
     * @throws Exception 오류
     * @since 2017.03.27
     */
    public void drawTextWithImage(String[] texts, String fileLoc, String backgrondImageURL) throws Exception
    {
        final int FONT_SIZE = 18;
        final int POS_X = 10;
        final int POS_Y = 10;
        BufferedImage img = ImageIO.read(new File(backgrondImageURL));

        Graphics g = img.getGraphics();
        Font font = new Font("맑은 고딕", Font.PLAIN, FONT_SIZE);
        
        // 우선은 첫 라인 정보만 가져온다. 일반적으로 가장 길게 설정하는 것이 맞다고 생각함.
        Rectangle rect = getFontrect(texts[0], font);
        
        int oriWidth = img.getWidth();
        int oriHeight = img.getHeight();
        
        double ratio = (rect.getWidth() + POS_X*2) / oriWidth;
        
        int newWidth = (int) (rect.getWidth() + POS_X*2);
        int newHeight = (int) (oriHeight * ratio);
        
        // 배경 이미지 RESIZE 처리
        img = resizeImage(img, newWidth, (newHeight*texts.length)+10);
        
        // 텍스트 처리
        for(int i=0;i<texts.length;i++){
            Graphics2D g2d = getG2D(img);
            g2d.setFont(font);
            
            int x = POS_X;
            int y = (FONT_SIZE + POS_Y)*(i + 1);
            
            // 그림자 처리
            drawStringDropshadow(g2d, texts[i], x, y);
        }
        g.dispose();

        // 배경 이미지 CROP 처리
        img = cropImage(img, new Rectangle(0, 0, newWidth, (FONT_SIZE+POS_Y)*texts.length+POS_Y) );

        // 이미지 파일을 생성한다
        ImageIO.write(img, "png", new File(fileLoc));
    }
    
    /**
     * 입력받은 문자열의 사각영역을 반환한다  
     * @param text 문자열 
     * @param font 폰트 
     * @return 사각크기
     * @since 2017.03.24
     */
    private Rectangle getFontrect(String text, Font font){
        BufferedImage img = new BufferedImage(1, 1, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g2d = img.createGraphics();
        g2d.setFont(font);
        FontMetrics fm = g2d.getFontMetrics();
        int width = fm.stringWidth(text);
        int height = fm.getHeight();
        g2d.dispose();
        
        return new Rectangle(0, 0, width, height);
    }
    
    /**
     * 아웃라인 처리
     * @param g2d 2D 그래픽스 
     * @param text 문자열 
     * @param x X좌표 
     * @param y Y좌표
     * @param cin 내부 색상 
     * @param cout 외부 색상 
     * @since 2017.03.27
     */
    private void drawStringOutline(Graphics2D g2d, String text, int x, int y, Color cin, Color cout){
        g2d.setColor(cout);
        g2d.drawString(text, ShiftWest(x, 1), ShiftNorth(y, 1));
        g2d.drawString(text, ShiftWest(x, 1), ShiftSouth(y, 1));
        g2d.drawString(text, ShiftEast(x, 1), ShiftNorth(y, 1));
        g2d.drawString(text, ShiftEast(x, 1), ShiftSouth(y, 1));
        
        g2d.setColor(cin);
        g2d.drawString(text, x, y);     
    }
    
    /**
     * 그림자 텍스트를 그려준다 
     * @param g2d 2D 그래픽스 
     * @param text 문자열 
     * @param x X좌표 
     * @param y Y좌표
     * @since 2017.03.27
     */
    private void drawStringDropshadow(Graphics2D g2d, String text, int x, int y)
    {
        g2d.setColor(Color.RED);
        g2d.drawString(text, ShiftEast(x, 2), ShiftSouth(y, 2));
        //g2d.setColor(new Color(220, 220, 220));
        //g2d.drawString(text, x, y);
    }
    
    /**
     * 폰트를 회전 처리한다 
     * @param font 폰트 
     * @param angle 회전각 0~360 / -를 넣으면 반시계 방향으로 계산 
     * @return 회전처리 된 폰트
     * @since 2017.03.24
     */
    private Font rotatedFont(Font font, double angle){
        // 폰트 회전처리
        AffineTransform form = new AffineTransform();
        form.rotate(Math.toRadians(angle), 0, 0);
        return font.deriveFont(form);
    }

    /**
     * 이미지 크롭처리 
     * @param img 이미지 
     * @param rect 사각정보
     * @return 신규 이미지 
     * @since 2017.03.24
     */
    private BufferedImage cropImage(BufferedImage img, Rectangle rect) {
        BufferedImage dest = img.getSubimage(rect.x, rect.y, rect.width, rect.height);
        return dest; 
    }

    /**
     * 이미지 리사이징
     * @param img 이미지 
     * @param newW 새로운 넓이 
     * @param newH 새로운 높이 
     * @return 신규 이미지 
     * @since 2017.03.24
     */
    private BufferedImage resizeImage(BufferedImage img, int newW, int newH) { 
        Image tmp = img.getScaledInstance(newW, newH, Image.SCALE_SMOOTH);
        BufferedImage dimg = new BufferedImage(newW, newH, BufferedImage.TYPE_INT_ARGB);

        Graphics2D g2d = dimg.createGraphics();
        g2d.drawImage(tmp, 0, 0, null);
        g2d.dispose();

        return dimg;
    }  

    /**
     * 이미지에서 2D 그래픽스 개체를 얻어온다 
     * @param img 이미지버퍼 
     * @return 2D 그래픽스
     * @since 2017.03.24
     */
    private Graphics2D getG2D(BufferedImage img)
    {
        Graphics2D g2d = img.createGraphics();
        g2d.setRenderingHint(RenderingHints.KEY_ALPHA_INTERPOLATION, RenderingHints.VALUE_ALPHA_INTERPOLATION_QUALITY);
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g2d.setRenderingHint(RenderingHints.KEY_COLOR_RENDERING, RenderingHints.VALUE_COLOR_RENDER_QUALITY);
        g2d.setRenderingHint(RenderingHints.KEY_DITHERING, RenderingHints.VALUE_DITHER_ENABLE);
        g2d.setRenderingHint(RenderingHints.KEY_FRACTIONALMETRICS, RenderingHints.VALUE_FRACTIONALMETRICS_ON);
        g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g2d.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        g2d.setRenderingHint(RenderingHints.KEY_STROKE_CONTROL, RenderingHints.VALUE_STROKE_PURE);

        return g2d;
    }

    /**
     * 좌표 이동처리 - 위쪽 / 북 
     * @param p  현 좌표 
     * @param distance 이동거리
     * @return 변경된 좌표
     * @since 2017.03.27
     */
    int ShiftNorth(int p, int distance) {
        return (p - distance);
    }
    
    /**
     * 좌표 이동처리 - 아래쪽 / 남 
     * @param p  현 좌표 
     * @param distance 이동거리
     * @return 변경된 좌표
     * @since 2017.03.27
     */
    int ShiftSouth(int p, int distance) {
        return (p + distance);
    }
    
    /**
     * 좌표 이동처리 - 오른쪽 / 동
     * @param p  현 좌표 
     * @param distance 이동거리
     * @return 변경된 좌표
     * @since 2017.03.27
     */
    int ShiftEast(int p, int distance) {
        return (p + distance);
    }
    
    /**
     * 좌표 이동처리 - 왼쪽 / 서 
     * @param p  현 좌표 
     * @param distance 이동거리
     * @return 변경된 좌표
     * @since 2017.03.27
     */
    int ShiftWest(int p, int distance) {
        return (p - distance);
    }
}