package applica.framework.widgets.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Applica (www.applica.guru)
 * User: bimbobruno
 * Date: 4/18/13
 * Time: 8:58 AM
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface FormButton {
    String label();
    String type();
    String action() default "";
}
